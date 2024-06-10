<script>
	import pipes from '$lib/images/pipes.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section>
	<div class="banner">
		<img src={pipes} alt="CS407 Graphic Demo's" />
	</div>
</section>
<div class="assignments text-column">
	<h1>Computer Graphics Demos:</h1>
	<ul>
		<li><a href="/assignment2">Assignment 2: Animate a simple object</a></li>
		<li><a href="/assignment3">Assignment 3: Refactor to use the World App structure and explore physically based lighting</a></li>
		<li><a href="/assignment4">Assignment 4: Using Transformations, the Scene Graph, and Animation</a></li>
		<li><a href="/assignment5">Assignment 5: </a></li>
		<li><a href="/assignment6">Assignment 6: </a></li>
		<li><a href="/assignment6">Assignment 7: </a></li>
	</ul>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		margin-top: 0px;
	}
	h1 {
		width: 100%;
	}

	.banner {
		text-align: center;
		border-right: 4px solid #333;
		border-left: 4px solid #333;
		border-radius: 10px;
	}
	.banner img {
		width: 600px;
		margin-right: -3px;
	}

	.assignments {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
		flex: 0.4;
	}
</style>
