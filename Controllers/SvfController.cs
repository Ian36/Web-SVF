using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Win32.SafeHandles;
using System.Net;
using Newtonsoft.Json;
using System.Text;

namespace Capstone_Proj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SvfController : ControllerBase
    {
        private readonly ILogger<SvfController> _logger;

        public SvfController(ILogger<SvfController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RequestBody requestBody)
        {
            await SetCompileOptions(requestBody.CompileOptions);
            await WriteToCFile(requestBody.Input);
            var output = await LaunchScript("analyzeBcFile.sh");
            var dotGraphs = GetDotGraphs();
            var llvm = await GetLLVMFile();
            var result = new SvfResult
            {
                Name = "Resultant Graphs",
                Output = output,
                Graphs = !output.Contains("error") ? dotGraphs : new List<DotGraph>(),
                Llvm = llvm
            };

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            CreatePullLatestScript();
            // var output = await LaunchScript("gitPullScript.sh");
            var response = new Response()
            {
                message = "Successfully updated WebSVF!" 
            };
            return Ok(response);
        }

        private void CreatePullLatestScript()
        {
            // var GitPullScript = "sudo apt-get install zlib1g-dev unzip cmake gcc g++ nodejs\nnpm i --silent svf-lib --prefix ${HOME}\nwget https://github.com/SVF-tools/SVF-example/archive/refs/heads/master.zip\nunzip -o master.zip\ncd SVF-example-master\nsource ./env.sh\ncmake . && make";
            // await System.IO.File.WriteAllTextAsync("gitPullScript.sh", GitPullScript);

            var getLatestSvf = Task.Run(async () =>
            {
                await RunScript();
            });
            getLatestSvf.Wait();
        }

        private static async Task RunScript()
        {
            var output = await LaunchScript("script.sh");
        }

        private static async Task<string> GetLLVMFile()
        {
            return System.IO.File.ReadAllText("example.ll");
        }

        private static async Task SetCompileOptions(string compileOptions)
        {
            var analyzeBcScript = "clang " + compileOptions + " example.c -o example.ll\n./svf-ex example.ll";
            await System.IO.File.WriteAllTextAsync("analyzeBcFile.sh", analyzeBcScript);
        }

        private async static Task<string> LaunchScript(string argss)
        {
            string command = "sh";
            string verb = " ";

            ProcessStartInfo procInfo = new ProcessStartInfo();
            procInfo.WindowStyle = ProcessWindowStyle.Normal;
            procInfo.UseShellExecute = false;
            procInfo.FileName = command;   // 'sh' for bash 
            procInfo.Arguments = argss;        // The Script name 
            procInfo.Verb = verb;                // ------------
            procInfo.RedirectStandardOutput = true;
            procInfo.RedirectStandardError = true;

            var p = new Process();
            p.StartInfo = procInfo;
            p.Start();
            string output = p.StandardOutput.ReadToEnd();
            string error = p.StandardError.ReadToEnd();
            p.WaitForExit();
            // await WaitForExitAsync(Process.Start(procInfo), new TimeSpan(0, 0, 30));// Start that process.
            return !String.IsNullOrWhiteSpace(error) ? error : output;
        }

        private static Task<bool> WaitForExitAsync(Process process, TimeSpan timeout)
        {
            ManualResetEvent processWaitObject = new ManualResetEvent(false);
            processWaitObject.SafeWaitHandle = new SafeWaitHandle(process.Handle, false);

            TaskCompletionSource<bool> tcs = new TaskCompletionSource<bool>();

            RegisteredWaitHandle registeredProcessWaitHandle = null;
            registeredProcessWaitHandle = ThreadPool.RegisterWaitForSingleObject(
                processWaitObject,
                delegate (object state, bool timedOut)
                {
                    if (!timedOut)
                    {
                        registeredProcessWaitHandle.Unregister(null);
                    }

                    processWaitObject.Dispose();
                    tcs.SetResult(!timedOut);
                },
                null /* state */,
                timeout,
                true /* executeOnlyOnce */);

            return tcs.Task;
        }

        public static async Task WriteToCFile(string input)
        {
            await System.IO.File.WriteAllTextAsync("example.c", input);
        }

        private static List<DotGraph> GetDotGraphs()
        {
            var dotFiles = new List<DotGraph>();
            foreach (string file in Directory.GetFiles(Directory.GetCurrentDirectory(), "*.dot"))
            {
                dotFiles.Add(new DotGraph { Name = file.Substring(file.LastIndexOf('/') + 1), Graph = System.IO.File.ReadAllText(file) });
            }

            return dotFiles;
        }
    }

    public class Response {
        public string message {get; set;}
    }
}
