import * as navigation from './navigation.js'

export function ListenForDropdownPressed()
{
    let dropdown = document.querySelector('.Dropdown');
    if(dropdown)
    {
        dropdown.addEventListener('click', OnDropdownPressed);
    }
}

function OnDropdownPressed()
{
    let dropdownContent = GetNavigationDropdownContent();
    let style = dropdownContent.style;
    let isActive = style.display == "flex";
    
    if(isActive)
    {
        style.display = "none";
    }
    else
    {
        style.display = "flex";
    }
}

function GetNavigationDropdownContent()
{
    return document.getElementById("MobileNav").children[0];
}

export function ListenForDisplaySizeChanged()
{
    let query = window.matchMedia("(min-width: 800px)");
    query.addEventListener("change", OnDisplaySizeChanged);
}

function OnDisplaySizeChanged(mediaQuery)
{
    if(mediaQuery.matches)
    {
        let dropdownContent = GetNavigationDropdownContent();
        dropdownContent.style.display = "none";
    }
}