using GraphQLServer.Database;
using GraphQLServer.Models;
using HotChocolate;
using System.Threading.Tasks;

namespace GraphQLServer.GraphQL
{
    public class Mutation
    {
        [HotChocolate.Data.UseDbContext(typeof(TimeGraphContext))]
        public async Task<Project> Project([ScopedService] TimeGraphContext dbContext, string createdBy, string name)
        {
            var Project = new Project
            {               
                CreatedBy = createdBy,
                Name = name                
            };

            dbContext.Projects.Add(Project);
            await dbContext.SaveChangesAsync();
            return Project;
        }
    }
}
