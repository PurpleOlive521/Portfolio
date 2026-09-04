import * as contentLoader from './contentLoader.js'
import * as navigation from './navigation.js'
import * as dropdown from './dropdown.js'
import * as contentSwitcher from './contentSwitcher.js'
import * as inPageNavigation from './inPageNavigation.js'
import * as expandableImages from './expandableImages.js'
import * as titles from './titles.js'
import * as tooltip from './tooltip.js'
import * as scrollableAutoplay from './scrollableAutoplay.js'


const START_EVENT = 'DOMContentLoaded';

window.addEventListener(START_EVENT, main);

function main()
{
    window.removeEventListener(START_EVENT, main);

    contentSwitcher.BindToContentSwitchers();
    tooltip.MakeTooltips();
    scrollableAutoplay.BindToScrollableAutoplays();

    contentLoader.InsertPageElements().then(() => 
    {
        navigation.SetActiveItem();
        dropdown.ListenForDropdownPressed();
        dropdown.ListenForDisplaySizeChanged();
        inPageNavigation.BindToNavigationPoints();
        expandableImages.BindExpandableImageModal();
        titles.AddTitlesToElements();
    });
}