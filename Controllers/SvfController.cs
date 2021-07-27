using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Capstone_Proj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SvfController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<SvfController> _logger;

        public SvfController(ILogger<SvfController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Post(string input)
        {
            LaunchSvfExample();
            var dotGraphs = GetDotGraphs();
            var result = new DotGraphs
            {
                Name = "Resultant Graphs",
                Graphs = dotGraphs
            };

            return Ok(result);
        }

        private static void LaunchSvfExample()
        {
            // Use ProcessStartInfo class
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.CreateNoWindow = false;
            startInfo.UseShellExecute = false;
            startInfo.FileName = "svf-ex";
            startInfo.WindowStyle = ProcessWindowStyle.Hidden;
            startInfo.Arguments = "example.ll";

            try
            {
                // Start the process with the info we specified.
                // Call WaitForExit and then the using statement will close.
                using (Process exeProcess = Process.Start(startInfo))
                {
                    exeProcess.WaitForExit();
                }
            }
            catch
            {
                // Log error.
            }
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
}
