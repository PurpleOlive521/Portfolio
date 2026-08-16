export function CreatePageNavigationElement(name)
{
    let root = CreateRootElement('li');

        let button = CreateChildElement(root, 'button', ['SideNavButton']);
            button.innerHTML = name;

    return root;
}

// Creates and returns a DOM element with given classes
function CreateElementWithClasses(inElement, inClasses = new Array())
{
    let element = document.createElement(inElement);

    for(const inClass of inClasses)
    {
        element.classList.add(inClass)
    }

    return element;
}

// Wrapper for the above function which makes it slightly clearer what the purpose is
function CreateRootElement(inElement, inClasses = new Array())
{
    return CreateElementWithClasses(inElement, inClasses);
}

// Creates and returns a DOM element with given classes, as a child of the given element.
function CreateChildElement(element, inElement, inClasses = new Array())
{
    let childElement = CreateElementWithClasses(inElement, inClasses);

    element.appendChild(childElement);

    return childElement;
}