using System.Collections.Generic;

namespace CapstoneProject
{
    public class SvfResult
    {
        public string Name { get; set; }
        public string Output { get; set; }
        public List<DotGraph> Graphs { get; set; }
    }

    public class DotGraph
    {
        public string Name { get; set; }
        public string Graph { get; set; }
    }
}
