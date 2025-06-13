function About() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto flex flex-col md:flex-row">
        <img src="/images/profile.jpg" alt="Profile" className="w-1/2 rounded-full" />
        <p className="text-lg">I'm a passionate web developer with expertise in React...</p>
      </div>
    </section>
  );
}
export default About;
