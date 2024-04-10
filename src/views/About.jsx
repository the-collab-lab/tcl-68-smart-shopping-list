import { IoLogoLinkedin } from 'react-icons/io5';
export function About() {
	return (
		<>
			<section className="flex flex-col border border-dark-green py-8 px-12 text-off-black tiny:mt-14 items-center justify-center bg-sage/50 rounded-2xl">
				<h1 className="font-bold text-off-black my-2">
					About this application:
				</h1>
				<p className="text-off-black my-2">
					Basket Buddy is a smart shopping list application, that enables a user
					to customize their shopping experience as it is used:
				</p>
				<ul>
					<li>
						Share and complete lists with other users, with changes updated in
						real time
					</li>
					<li>
						Complete a list over multiple store visits, as you check items off a
						list for 24 hours
					</li>
					<li>
						Set future purchase dates for items, and BB will help determine the
						best interval over time with each purchase
					</li>
				</ul>
			</section>
			<section className="flex flex-col border border-dark-green py-8 px-12 text-off-black tiny:mt-14 items-center justify-center bg-sage/50 rounded-2xl">
				<h2 className="font-bold text-off-black">The Creators:</h2>
				<div>
					<a
						href="https://www.linkedin.com/in/andreapang/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin />
					</a>
					Andrea Pang
				</div>
				<div>
					<a
						href="https://www.linkedin.com/in/shanemisra/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin />
					</a>
					Shane Misra
				</div>
				<div>
					<a
						href="https://www.linkedin.com/in/emily-tiry/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin />
					</a>
					Emily Tiry
				</div>
				<div>
					<a
						href="https://www.linkedin.com/in/devina-gillis/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin />
					</a>
					Devina Gillis
				</div>
			</section>
			<section className="flex flex-col border border-dark-green py-8 px-12 text-off-black tiny:mt-14 items-center justify-center bg-sage/50 rounded-2xl">
				<h2 className="font-bold text-off-black">Special thanks to:</h2>
				<span className="">Our mentors: Caitlyn, Luis, Raynaldo</span>
				<a href="https://the-collab-lab.codes/">
					<span>The Collab Lab</span>
				</a>
			</section>
		</>
	);
}
