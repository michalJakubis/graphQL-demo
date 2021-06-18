using GraphQLServer.Models;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLServer.GraphQL
{
    public class ProjectType : ObjectType<Project>
    {
    }

    public class TimeLogType : ObjectType<TimeLog>
    {
    }
}
