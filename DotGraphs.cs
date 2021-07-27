using System;
using System.Collections.Generic;

namespace Capstone_Proj
{
    public class DotGraphs
    {
        public string Name { get; set; }
        public List<DotGraph> Graphs { get; set; }
    }

    public class DotGraph
    {
        public string Name { get; set; }
        public string Graph { get; set; }
    }
}
