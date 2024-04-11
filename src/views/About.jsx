import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5';
export function About() {
	return (
		<>
			<section className="flex flex-col border border-dark-green py-8 px-12 mx-8 md:mx-24 text-off-black tiny:mt-14 items-center justify-center bg-sage/50 rounded-2xl">
				<h1 className="font-bold text-off-black my-2">
					About this application:
				</h1>
				<p className="text-off-black my-2">
					Basket Buddy is a smart shopping list application, that enables a user
					to customize their shopping experience as it is used:
				</p>
				<ul className="ml-6 list-disc">
					<li className="my-4">
						Share and complete lists with other users, with changes updated in
						real time
					</li>
					<li className="my-4">
						Complete a list over multiple store visits, as you check items off a
						list for 24 hours
					</li>
					<li className="my-4">
						Set future purchase dates for items, and BB will help determine the
						best interval over time with each purchase
					</li>
				</ul>
			</section>
			<section className="flex flex-col border border-dark-green py-8 px-12 mx-8 md:mx-24 text-off-black tiny:mt-14 items-center justify-center bg-sage/50 rounded-2xl">
				<h2 className="font-bold text-off-black">The Creators:</h2>
				<div className="flex justify-between items-center w-2/3 md:w-1/3 my-4">
					<a
						href="https://www.linkedin.com/in/andreapang/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin className="text-5xl" />
					</a>
					<span>Andrea Pang</span>
					<a
						href="https://github.com/andiedoescode"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoGithub className="text-5xl" />
					</a>
				</div>
				<div className="flex justify-between items-center w-2/3 md:w-1/3 my-4">
					<a
						href="https://www.linkedin.com/in/shanemisra/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin className="text-5xl" />
					</a>
					<span>Shane Misra</span>
					<a href="https://github.com/sdmisra" target="_blank" rel="noreferrer">
						<IoLogoGithub className="text-5xl" />
					</a>
				</div>
				<div className="flex justify-between items-center w-2/3 md:w-1/3 my-4">
					<a
						href="https://www.linkedin.com/in/emily-tiry/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin className="text-5xl" />
					</a>
					<span>Emily Tiry</span>
					<a href="https://github.com/etiry" target="_blank" rel="noreferrer">
						<IoLogoGithub className="text-5xl" />
					</a>
				</div>
				<div className="flex justify-between items-center w-2/3 md:w-1/3 my-4">
					<a
						href="https://www.linkedin.com/in/devina-gillis/"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoLinkedin className="text-5xl" />
					</a>
					<span>Devina Gillis</span>
					<a
						href="https://github.com/DevinaG007"
						target="_blank"
						rel="noreferrer"
					>
						<IoLogoGithub className="text-5xl" />
					</a>
				</div>
			</section>
			<section className="flex flex-col border border-dark-green py-8 px-12 mx-8 md:mx-24 text-off-black tiny:mt-14 items-center justify-center bg-sage/50 rounded-2xl">
				<h2 className="font-bold text-off-black">Special thanks to:</h2>
				<span className="text-2xl">Our mentors: Caitlyn, Luis, Raynaldo</span>
				<a
					href="https://the-collab-lab.codes/"
					target="_blank"
					rel="noreferrer"
				>
					<span className="font-semibold text-off-black">The Collab Lab</span>
				</a>
			</section>
		</>
	);
}
