import * as pageElements from './pageElements.js'

// Maps a element to track to its NavigationPoint
let navigationPoints = new Map();

class NavigationPoint
{
    // Where navigationTarget is the element we will scroll to.
    constructor(navigationTarget)
    {
        this.depth = null;
        this.target = navigationTarget;
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

        navigationPoints.set(element, new NavigationPoint(target));
        navigationRoot.appendChild(element);
    }

    CalculateNavigationPoints();

    window.addEventListener('scroll', HandleScroll);
    const resizingObserver = new MutationObserver(CalculateNavigationPoints);
    resizingObserver.observe(document.getRootNode(), {childList: true, subtree: true });
}

function OnNavigationClicked(event)
{
    event.target.scrollIntoView('smooth');
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
    if (!currentPoint.children[0].classList.contains('active')) 
    {
        for(const [element, navigationPoint] of navigationPoints)
        {
            element.children[0].classList.remove('active');
        }

        currentPoint.children[0].classList.add('active');
    }
}