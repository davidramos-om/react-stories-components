import React, { useEffect, useState } from 'react'
import { ReactInstaStoriesProps, GlobalCtx, Story, Tester, Renderer } from './interfaces'
import Container from './components/Container'
import GlobalContext from './context/Global'
import StoriesContext from './context/Stories';
import { getRenderer } from './util/renderers'
import { renderers as defaultRenderers } from './renderers/index';
import withHeader from './renderers/wrappers/withHeader'
import withSeeMore from './renderers/wrappers/withSeeMore'

const ReactInstaStories = function (props: ReactInstaStoriesProps) {
    let renderers = props.renderers ? props.renderers.concat(defaultRenderers) : defaultRenderers;
    let context: GlobalCtx = {
        width: props.width,
        height: props.height,
        loader: props.loader,
        header: props.header,
        storyStyles: props.storyStyles,
        loop: props.loop,
        defaultInterval: props.defaultInterval,
        automatic: props.automatic,
        // useNavigationBar: props.useNavigationBar,
        // navigationNode: props.navigationNode,

        isPaused: props.isPaused,
        currentIndex: props.currentIndex,
        onStoryStart: props.onStoryStart,
        onStoryEnd: props.onStoryEnd,
        onStoryChange: props.onStoryChange,
        onAllStoriesEnd: props.onAllStoriesEnd,
        keyboardNavigation: props.keyboardNavigation
    }
    const [ stories, setStories ] = useState<{ stories: Story[] }>({ stories: generateStories(props.stories, renderers) });
    useEffect(() => {
        setStories({ stories: generateStories(props.stories, renderers) });
    }, [ props.stories, props.renderers ]);

    return <GlobalContext.Provider value={context}>
        <StoriesContext.Provider value={stories}>
            <Container />
        </StoriesContext.Provider>
    </GlobalContext.Provider>
}

const generateStories = (stories: Story[], renderers: { renderer: Renderer, tester: Tester }[]) => {
    return stories.map(s => {
        let story: Story = {};

        if (typeof s === 'string') {
            story.url = s;
            story.type = 'image';
        } else if (typeof s === 'object') {
            story = Object.assign(story, s);
        }

        let renderer = getRenderer(story, renderers);
        story.originalContent = story.content;
        story.content = renderer;
        return story
    })
};

ReactInstaStories.defaultProps = {
    width: 360,
    height: 640,
    defaultInterval: 4000,
    automatic: true,
    // useNavigationBar: false,
    // navigationNode: null,
}

export const WithHeader = withHeader;
export const WithSeeMore = withSeeMore;

export default ReactInstaStories