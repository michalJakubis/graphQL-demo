using GraphQLServer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphQLServer.Database
{
    public class ProjectRepository
    {
        private readonly TimeGraphContext _timeGraphContext;

        public ProjectRepository(TimeGraphContext timeGraphContext)
        {
            _timeGraphContext = timeGraphContext;
        }

        public List<Project> GetAllProjectOnly()
        {
            return _timeGraphContext.Projects.ToList();
        }

        public List<Project> GetAllProjectsWithAuthor()
        {
            return _timeGraphContext.Projects.
                //.Include(d => d.Employees)
                ToList();
        }

        public async Task<Project> CreateProject(Project project)
        {
            await _timeGraphContext.Projects.AddAsync(project);
            await _timeGraphContext.SaveChangesAsync();
            return project;
        }
    }
}
