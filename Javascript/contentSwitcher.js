
export function BindToContentSwitchers()
{
    const switchers = document.querySelectorAll('.Switcher');

    for(const switcher of switchers)
    {
        switcher.addEventListener('click', OnContentSwitcherTabClicked);
    }

    TryRecoverActiveSwitchers();
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

        if(element.id == target)
        {
            element.classList.add('active');
        }
    }

    sessionStorage.setItem(root.id, target);
}