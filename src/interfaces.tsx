import * as React from 'react';

export interface ReactInstaStoriesProps {
    stories: Story[];
    width?: number;
    height?: number;
    loader?: JSX.Element;
    header?: Function;
    storyStyles?: Object;
    loop?: boolean;
    defaultInterval?: number;

    automatic?: boolean;
    // useNavigationBar?: boolean,
    // navigationNode: JSX.Element,

    isPaused?: boolean;
    currentIndex?: number;
    renderers?: {
        renderer: Renderer;
        tester: Tester
    }[];
    onAllStoriesEnd?: Function;
    onStoryStart?: Function;
    onStoryEnd?: Function;
    onStoryChange?: Function;
    keyboardNavigation?: boolean;
}

export interface GlobalCtx {
    width?: number;
    height?: number;
    loader?: JSX.Element;
    header?: Function;
    storyStyles?: Object;
    loop?: boolean;
    defaultInterval?: number;

    automatic?: boolean;
    // useNavigationBar?: boolean,
    // navigationNode: JSX.Element,

    isPaused?: boolean;
    currentIndex?: number;
    renderers?: {
        renderer: Renderer;
        tester: Tester
    }[];
    onAllStoriesEnd?: Function;
    onStoryStart?: Function;
    onStoryEnd?: Function;
    onStoryChange?: Function;
    keyboardNavigation?: boolean;
}

export interface StoriesContext {
    stories: Story[];
}

export interface ContainerState {
    currentId: number;
    pause: boolean;
    count: number;
    storiesDone: number
}

export type Action = (action: string, bufferAction?: boolean) => void;
export interface Renderer extends React.FC<{
    action: Action;
    isPaused: boolean;
    story: Story;
    config: {
        width?: number;
        height?: number;
        loader?: JSX.Element;
        header?: Function;
        storyStyles?: Object;
    };
    messageHandler: (type: string, data: any) => ({ ack: 'OK' | 'ERROR' })
}> { }

export type Tester = (story: Story) => {
    condition: boolean;
    priority: number;
};

export interface StoryProps {
    story: Story;
    action: Action;
    playState: boolean;
    getVideoDuration: Function;
    bufferAction: boolean;
}

export interface StoryState {
    loaded: boolean;
    showMore: boolean
}

export interface Story {
    url?: string;
    clickable?: boolean,
    hideStoryProgress?: boolean,
    preventChangeSideTapped?: boolean,
    stopOnClick?: boolean,
    seeMore?: Function;
    seeMoreCollapsed?: React.ComponentType<{ toggleMore: (show: boolean) => void, action: Action }>;
    header?: Header;
    type?: string;
    duration?: number;
    styles?: object;
    content?: Renderer;
    originalContent?: Renderer,
    onStoryClicked?: Function
}

export interface Header {
    heading: string;
    subheading: string;
    profileImage: string
}

export interface SeeMoreProps {
    seeMoreContent: Function;
    showContent: boolean;
    action: Action;
    toggleMore: (show: boolean) => void;
    customCollapsed: React.ComponentType<{ toggleMore: (show: boolean) => void, action: Action }>
}

export interface HeaderProps {
    profileImage: string;
    heading: string;
    subheading: string
}

export interface ProgressProps {
    width: number;
    active: number;
    count: number
}

export interface ProgressWrapperProps {
    children: any;
    width: number;
    pause: boolean;
    currentId: number;
    automatic: boolean;
    bufferAction: boolean
}

export interface ProgressArrayProps {

}

export interface ProgressContext {
    currentId: number;
    videoDuration: number;
    bufferAction: boolean;
    pause: boolean;
    automatic: boolean;
    next: Function
}