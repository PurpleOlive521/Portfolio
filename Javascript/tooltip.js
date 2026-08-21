import * as pageElements from './pageElements.js'

export function MakeTooltips()
{
    const targets = document.querySelectorAll(".TooltipTarget");

    if(targets.length <= 0)
    {
        return;
    }

    for(const target of targets)
    {
        let element = pageElements.CreateTooltipElement(target.innerHTML, target.dataset.tooltip);
        target.replaceWith(element);
    }
}