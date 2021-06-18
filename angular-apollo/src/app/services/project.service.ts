import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      createdBy
      name
    }
  }
`;

const GET_PROJECTS_BY_AUTHOR = gql`
  query GetProjectsByAuthor($createdBy: String) {
    projectsByAuthor(createdBy: $createdBy) {
      createdBy
      name
    }
  }
`;

const ADD_PROJECT = gql`
  mutation AddProject( $name: String, $createdBy: String) {
    project( name: $name, createdBy: $createdBy){
      name,
      createdBy
    }
  }`
;

const pollInterval = 1000;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apollo: Apollo) { }

  public addProject(name: string, createdBy: string) {
    return this.apollo.mutate({
      mutation: ADD_PROJECT,
      variables: {
        name: name,
        createdBy: createdBy
      }
    })
  }

  public getProjects() {
    return this.apollo.watchQuery({
      query: GET_PROJECTS,
      pollInterval: pollInterval
    })
      .valueChanges
  }

  public getProjectsByAuthor(author: string) {
    return this.apollo.watchQuery({
      query: GET_PROJECTS_BY_AUTHOR,
      variables: {
        createdBy: author
      },
      pollInterval: pollInterval
    })
      .valueChanges
  }
}
