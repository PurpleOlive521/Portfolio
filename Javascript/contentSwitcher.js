
export function BindToContentSwitchers()
{
    const switchers = document.querySelectorAll('.Switcher');

    for(const switcher of switchers)
    {
        switcher.addEventListener('click', OnContentSwitcherTabClicked);
    }

    TryRecoverActiveSwitchers();
    
    PauseAllAutoplaySwitcherVideos();
}

function OnContentSwitcherTabClicked(event)
{
    let tab = event.target;

    SetActiveSwitcherContent(tab);
}

function TryRecoverActiveSwitchers()
{
    const contentSwitchers = document.querySelectorAll('.ContentSwitcher');

    for(const contentSwitcher of contentSwitchers)
    {
        let lastActiveSwitcher = sessionStorage.getItem(contentSwitcher.id);
        if(!lastActiveSwitcher)
        {
            continue;
        }

        let switchers = contentSwitcher.children[0];
        for(const child of switchers.children)
        {
            if(child.classList.contains("Switch") && child.dataset.tab == lastActiveSwitcher)
            {
                SetActiveSwitcherContent(child);
            }
        }
    }
}

function PauseAllAutoplaySwitcherVideos()
{
    const switchers = document.querySelectorAll('.ContentSwitcher');

    for(const switcher of switchers)
    {
        const videos = switcher.querySelectorAll('video');

        for(const video of videos)
        {
            if(video.autoplay && !video.parentElement.classList.contains('active'))    
            {
                video.pause();
            }
        }
    }
}

function SetActiveSwitcherContent(activeSwitcher)
{
    let switchers = activeSwitcher.parentElement;
    let root = switchers.parentElement;

    const target = activeSwitcher.dataset.tab;

    // Remove any tab actives
    for(const element of switchers.children)
    {        
        element.classList.remove('active');
    }

    // Mark clicked as active
    activeSwitcher.classList.add('active');


    // Remove active class from all contents and add one to the clicked ones
    for(const element of root.children)
    {        
        element.classList.remove('active');

        const videos = element.querySelectorAll('video');

        // Find the content we want to activate
        if(element.id == target)
        {
            element.classList.add('active');

            // Start any autoplay video that the new active element has.
            for(const video of videos)
            {
                if(video.autoplay)    
                {
                    video.play();
                }
            }
        }
        else
        {
            // Stop any video that we find
            for(const video of videos)
            {
                video.pause();
            }
        }
    }

    sessionStorage.setItem(root.id, target);
}