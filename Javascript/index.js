import * as contentLoader from './contentLoader.js'
import * as navigation from './navigation.js'
import * as dropdown from './dropdown.js'

window.addEventListener('load', main);

function main()
{
    window.removeEventListener('load', main);

    contentLoader.InsertPageElements().then(() => 
    {
        navigation.SetActiveItem();
        dropdown.ListenForDropdownPressed();
        dropdown.ListenForDisplaySizeChanged();
        
    });
}