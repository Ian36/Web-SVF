using System;
using System.Collections.Generic;

namespace Capstone_Proj
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
