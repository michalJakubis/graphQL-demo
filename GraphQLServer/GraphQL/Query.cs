using GraphQL.Types;
using GraphQLServer.Database;
using GraphQLServer.Models;
using HotChocolate;
using HotChocolate.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLServer.GraphQL
{
    public class Query
    {
        [UseDbContext(typeof(TimeGraphContext))]
        public IQueryable<Project> GetProjects([ScopedService] TimeGraphContext dbcontext)
        {
            return dbcontext.Projects;
        }

        [UseDbContext(typeof(TimeGraphContext))]
        public IQueryable<Project> GetProjectsByAuthor([ScopedService] TimeGraphContext dbcontext, string createdBy)
        {
            return dbcontext.Projects.Where(project => project.CreatedBy.Contains(createdBy));
        }

        [UseDbContext(typeof(TimeGraphContext))]
        public IQueryable<TimeLog> GetTimeLogs([ScopedService] TimeGraphContext dbcontext)
        {
            return dbcontext.TimeLogs;
        }
    }
}
