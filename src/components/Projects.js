function Projects() {
  const projects = [
    { title: "Project 1", image: "/images/project1.jpg", description: "A web app...", link: "https://github.com" },
    // Add more projects
  ];
  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg">
            <img src={project.image} alt={project.title} />
            <h3 className="text-xl">{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="text-blue-500">View on GitHub</a>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Projects;
