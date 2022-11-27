<script setup>

import {onMounted, ref} from 'vue'


</script>

<template>
    <div class="wrapAll clearfix">
			<div class="sidebar bg-slate-300 text-black">
				<div class="logo">
					<a href="/"><img src='../../assets/logo.png' alt="logo"></a>
                    <p class="text-xs">Gracefully generated logo by <a href="https://openai.com/dall-e-2/">DALL-E AI</a>. Check out their work !</p>
				</div>
				<div class="navigation ">
					<ul>
						<li><a href="pages">Main page</a></li>
						<li><a href="#">Contents</a></li>
					</ul>
				</div>

			
			</div>
			<div class="mainsection">
				
				<div class="article border hover:contrast-more:bg-black text-black">
					<h1>Wikue</h1>
					<p class="siteSub">From Wikue, the very expensive alternative to Wikipedia</p>

					<div class="flex-row-reverse flex">
                        <div class="border w-1/2 m-2">
							<h2>Featured article</h2>
							<div>
								<img src="https://www.patterns.dev/img/reactjs/react-logo@3x.svg"/>
								<div>
									<h3>React</h3>
									<p>React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.</p>
								<b>It's actually factually better than Vue</b></div>
							</div>
						</div>
						<div class="w-1/2 m-2">
                        	<p>Wikue is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. The project is supported by the non-profit Wikimedia Foundation, a US-registered 501(c)(3) educational charity. The foundation owns and maintains the infrastructure, databases, and the development tools for the Wikipedia project. Wikipedia is the largest general reference work on the Internet, and one of the 15 most popular websites as ranked by Alexa; in 2021, it was ranked as the 13th most popular website in the world. As of February 2021, 6.1 million articles are available in English, and there are more than 60 million articles in all languages. The English Wikipedia alone contains more than 5.8 million articles. Wikipedia has been criticized for its uneven accuracy and for exhibiting systemic bias, particularly</p>
							
						</div>
                    </div>
					
				</div>
				
			
			
			</div>		
		</div>
</template>

