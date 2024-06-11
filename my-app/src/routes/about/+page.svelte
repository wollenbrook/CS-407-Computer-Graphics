<script>
    const githubURL = 'https://github.com/wollenbrook/CS-407-Computer-Graphics';
    const courseInfo = {
        number: 'CS 407',
        title: 'Seminar: Computer Graphics',
        description: 'This seminar was on the fundamentals of modern 3D interactive computer graphics. Covers fundamental graphics algorithms for modeling, rendering, lighting and shading as well as the operations of GPU hardware and a modern programming API.'
    };
</script>

<h1>About {courseInfo.number}: {courseInfo.title}</h1>
<p>{courseInfo.description}</p>
<p>Check out the GitHub repository for this project: <a href={githubURL} target="_blank"> here</a>.</p>