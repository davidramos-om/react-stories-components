import './App.css';
import React, { useState } from 'react';
import Stories, { WithSeeMore } from 'react-stories-components'
import { StoryNav } from './StoryNav';

const image = {
	display: 'block',
	maxWidth: '100%',
	borderRadius: 4,
}

const code = {
	background: '#eee',
	padding: '5px 10px',
	borderRadius: '4px',
	color: '#333',
}

const contentStyle = {
	background: 'salmon',
	width: '100%',
	padding: 20,
	color: 'white'
}

const customSeeMore = {
	textAlign: 'center',
	cursor: 'pointer',
	fontSize: 14,
	bottom: 50,
	position: 'relative'
}

const themeOrange = {
	background: 'orange',
	color: 'white',
	boderColorButton: 'white'
}

export const contentStyle_NavStory = {
	...themeOrange,
	width: '100%',
	height: '-webkit-fill-available',
	padding: 10,
	userSelect: 'none',
}


const App = ({ onAllStoriesEnd }) => {

	const [ currentIndex, setCurrentIndex ] = useState(0);

	const handleClose = () => {

		alert("Close button nav clicked");

		if (onAllStoriesEnd)
			onAllStoriesEnd();
	}

	const handleNext = () => {
		if (currentIndex + 1 > 8)
			return;

		setCurrentIndex(currentIndex + 1);
	}

	const handlePrevious = () => {
		if (currentIndex - 1 < 0)
			return;

		setCurrentIndex(currentIndex - 1);
	}

	return (
		<div className="App">
			<div className="left">
				<h2><code><a rel="noopener noreferrer" href="https://www.npmjs.com/package/react-stories-components" target="_blank">react-stories-components</a></code></h2>
				<p>Create Instagram like stories on the web using React</p>
				<br />
				<code ><span style={{ background: '#eee', padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 5, width: 'auto' }}>npm i react-stories-components</span></code>
				<br />
				<a href="https://github.com/davidramos-om/react-stories-components">Documentation</a>
				<br />
				<p>Fork from
					<a
						rel="noopener noreferrer"
						href="https://github.com/mohitk05/react-insta-stories"
						target="_blank"
					> @mohitk05
					</a>  with ♥ by
					<a
						rel="noopener noreferrer"
						href="https://github.com/davidramos-om/react-stories-components"
						target="_blank"
					> @davidramos-om</a>
				</p>
				<br />
				<div style={{ background: '#eee', padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 5, width: 'auto' }}><p>◀ Tap left for previous story</p>
					<p>▶︎ Tap right for next story</p>
					<p>◉ Press and hold to pause</p></div>
				<br />
				<p>Know more about me here: <a rel="noopener noreferrer" href="https://www.davidramos-om.com" target="_blank">davidramos-om.com</a></p>
			</div>


			<div className="stories">
				<Stories
					stories={generateStories(handleClose, handlePrevious, handleNext)}
					currentIndex={currentIndex}
					defaultInterval={10000}
					loop={true}
					keyboardNavigation={true}
					automatic={true}
					onStoryChange={(prev, current, next) => {
						console.info("onStoryChange.prev", prev);
						console.info("onStoryChange.current", current);
						console.info("onStoryChange.next", next);
						setCurrentIndex(current)
					}}
					onStoryEnd={(s, st) => {
						console.log('story ended', s)
					}}
					onStoryStart={(s, st) => {
						console.log('story started', s)
					}}
					onAllStoriesEnd={(s, st) => {
						console.log('all stories ended', s)
					}}
				/>
			</div>

		</div>
	);
}

const generateStories = (onClose, onPrevious, onNext) => {

	const storiesList = [
		{
			clickable: true,
			stopOnClick: true,
			content: ({ action, isPaused }) => {
				return (
					<ClickedComponentStory
						action={action}
						isPaused={isPaused}
						onPrevious={onPrevious}
						onClose={onClose}
						onNext={onNext}
					/>
				);
			},
			onStoryClicked: (id, st, target) => {
				console.log(`story clicked -> id : `, id);
				console.log('story clicked -> target : ', target);
			}
		},
		{
			clickable: true,
			stopOnClick: true,
			hideStoryProgress: true,
			content: ({ action, isPaused }) => {

				return (
					<ManuallyNextPrevStory
						action={action}
						isPaused={isPaused}
						onPrevious={onPrevious}
						onClose={onClose}
						onNext={onNext}
					/>
				);
			},
		},
		{
			preventChangeSideTapped: true,
			duration: 15000,
			content: ({ action, story }) => {
				return <WithSeeMore
					story={story}
					action={action}
				>
					<div style={{ background: 'pink', padding: 20, margin: '0x', height: '100%' }}>
						<h1 style={{ marginTop: '50%', marginBottom: 0 }}> 🚀  </h1>
						<h1 style={{ marginTop: 5 }}>We have our good old image and video stories, just the same.</h1>
						<br></br>
						<h3 style={{ marginTop: 5 }}>Disable going to prev/next story when you are tapping the left-right side</h3>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<p style={{ fontSize: 'xx-large' }}>👈  👉 </p>
						</div>
						<code style={code}>
							preventChangeSideTapped : false
						</code>
					</div>
				</WithSeeMore>
			},
			seeMoreCollapsed: ({ toggleMore, action }) => {
				return (
					<p
						style={customSeeMore}
						onClick={() => toggleMore(true)}
					>
						A custom See More message
					</p>
				)
			},
			seeMore: ({ close }) => {
				return (
					<div
						style={{ maxWidth: '100%', height: '100%', padding: 40, background: 'white' }}
					>
						<h2>Just checking the see more feature.</h2>
						<p
							style={{ textDecoration: 'underline', cursor: 'pointer' }}
							onClick={close}
						>
							Close this popup.
						</p>
					</div>)
			}
		},
		{
			content: ({ action, isPaused }) => {
				return <div style={contentStyle}>
					<h1>The new version is here.</h1>
					<p>This is the new story.</p>
					<p>Now render React components right into your stories.</p>
					<p>Possibilities are endless, like here - here's a code block!</p>
					<pre>
						<code style={code}>
							console.log('Hello, world!')
						</code>
					</pre>
					<p>Or here, an image!</p>
					<br />
					<img style={image} src="https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"></img>
					<h3>Perfect. But there's more!</h3>
				</div>
			}
		},
		{
			url: 'https://picsum.photos/1080/1920',
			seeMore: ({ close }) => {
				return (
					<div
						style={{ maxWidth: '100%', height: '100%', padding: 40, background: 'white' }}
					>
						<h2>Just checking the see more feature.</h2>
						<p style={{ textDecoration: 'underline' }}
							onClick={close}
						>
							Close this popup.
						</p>
					</div>
				)
			}
		},
		{
			url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
			type: 'video'
		},
		{
			content: StoryComponent
		}
	];

	return storiesList;
}

const ClickedComponentStory = ({ action, isPaused, showNav = true, onClose, onPrevious, onNext }) => {

	const handleButtonClick = (e) => {
		e.preventDefault();
		alert("Button clicked");
	}

	const handleTextClick = (e) => {
		e.preventDefault();
		alert("Text clicked");
	}

	return (
		<div style={{ background: '#4CAF50', color: 'white', padding: 20, margin: '0x', height: '100%' }}>


			{showNav ?
				<div style={{ paddingTop: '10px' }}>
					<StoryNav
						onClose={onClose}
						onPrevious={onPrevious}
						onNext={onNext}
					/>
				</div>
				: null
			}

			<h3 style={{ marginTop: '50%', marginBottom: 0 }}>On this fork, now you are able to :</h3>
			<pre>
				<p>Add clickable components:</p>
				<br />
				<code style={code}>
					clickable : true
				</code>
				<br />
				<br />
				<p>Prevent to pass to next story :</p>
				<br />
				<code style={code}>
					automatic : false
				</code>
			</pre>
			<p>By just passing property inside your story object.</p>
			<br />
			<button className="button-three" onClick={handleButtonClick} >Click Me</button>
			<br />
			<h3 style={{ cursor: 'pointer' }} onClick={handleTextClick} >Click on text</h3>
		</div>
	);
}


const ManuallyNextPrevStory = ({ action, isPaused, onClose, onPrevious, onNext }) => {

	return (
		<div id="nav-story'" style={contentStyle_NavStory}>

			<StoryNav
				iconColor={contentStyle_NavStory.boderColorButton}
				onClose={onClose}
				onPrevious={onPrevious}
				onNext={onNext}
			/>

			<h3 style={{ marginTop: '50%', marginBottom: 0 }}>Create your own navigation</h3>

			<br></br>
			<code style={code}>
				automatic : false
			</code>
			<br></br>
			<br></br>
			<code style={code}>
				keyboardNavigation : false
			</code>
			<br></br>
			<h4 >You can also hide the indicator progress per story</h4>
			<code style={code}>
				hideStoryProgress : true
			</code>
		</div>
	);
}



const StoryComponent = ({ action, isPaused }) => {
	return (
		<div style={{ ...contentStyle, background: 'Aquamarine', marginTop: '50%', color: '#16161d', height: '100%' }}>
			<h1>You get the control of the story.</h1>
			<p>Render your custom JSX by passing just a
				<code style={{ fontStyle: 'italic' }}> content</code> property inside your story object.</p>
			<p>You get a <code style={{ fontStyle: 'italic' }}>action</code> prop as an input to your content function, that can be used to play or pause the story.</p>
			<h1>{isPaused ? 'Paused' : 'Playing'}</h1>
		</div>
	);
}

export default App;
