import * as pageElements from './pageElements.js'

// Maps a element to track to its NavigationPoint
let navigationPoints = new Map();

class NavigationPoint
{
    // Where navigationTarget is the element we will scroll to.
    constructor(navigationTarget, internalId)
    {
        this.depth = null;
        this.target = navigationTarget;
        this.internalId = internalId;
    }
}

export function BindToNavigationPoints()
{
    const inPageNavigation = document.getElementById('InPageNavigator');

    if(!inPageNavigation)
    {
        return;
    }

    let navigationRoot = inPageNavigation.children[0];
    const navigationTargets = document.querySelectorAll('.InPageNavigationTarget');

    for(const target of navigationTargets)
    {
        let element = pageElements.CreatePageNavigationElement(target.dataset.name);
        let button = element.children[0];

        button.addEventListener('click', OnNavigationClicked.bind(target));

        navigationPoints.set(button, new NavigationPoint(target, target.id));
        navigationRoot.appendChild(element);
    }

    CalculateNavigationPoints();

    ParseURLDirective();

    window.addEventListener('scroll', HandleScroll);
    const resizingObserver = new MutationObserver(CalculateNavigationPoints);
    resizingObserver.observe(document.getRootNode(), {childList: true, subtree: true });
}

// Jumps to a NavigationPoint that matches with the url query string 
function ParseURLDirective()
{   
    let destination = window.location.search;
    destination = destination.slice(1, destination.length); // Remove starting '?'

    if(destination.length > 0)
    {
        let point = GetNavigationPoint(destination);
        if(point)
        {
            point.target.scrollIntoView({behavior: "instant", block: "start"});

            const url = window.location.origin + window.location.pathname
            window.history.replaceState(null, '', url);
            
            //window.location.search = window.location.search.replace(destination, "");
        }
    }
}

function GetNavigationPoint(internalId)
{
    for(const [element, navigationPoint] of navigationPoints)
    {
        if(navigationPoint.internalId == internalId)
        {
            return navigationPoint;
        }
    }
    
    return null;
}

function OnNavigationClicked(event)
{
    let scrollTarget = navigationPoints.get(event.target).target;

    scrollTarget.scrollIntoView({behavior: "smooth", block: "start"});
}

function CalculateNavigationPoints()
{
    const currentScroll = window.scrollY - 300;
    
    for (const [element, navigationPoint] of navigationPoints) 
    {
        let newDepth = navigationPoint.target.getBoundingClientRect().top + currentScroll;
        navigationPoints.get(element).depth = newDepth;
    }

    HandleScroll();
}

function HandleScroll()
{
    const currentPosition = window.scrollY;

    let currentPoint = navigationPoints.keys().next().value;

    for (const [element, navigationPoint] of navigationPoints) 
    {
        if( navigationPoint.depth <= currentPosition)
        {
            currentPoint = element;
        }
    }

    // Add active to new navigationPoint element
    if (!currentPoint.classList.contains('active')) 
    {
        for(const [element, navigationPoint] of navigationPoints)
        {
            element.classList.remove('active');
        }

        currentPoint.classList.add('active');
    }
}