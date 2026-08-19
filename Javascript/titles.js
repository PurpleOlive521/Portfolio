const UNREAL_BLUEPRINT_TITLE = "Right-click and drag to move around in the Blueprint Graph.";
const PRISM_CODE_BLOCK = "Code can also be found on my Github page for easier viewing :)";
const EXPANDABLE_IMAGE = "Left-click to expand the image.";

export function AddTitlesToElements()
{
    // Prism code blocks
    AddTitleToType("pre > code", PRISM_CODE_BLOCK);
    
    // Blueprint node graphs
    AddTitleToType("iframe", UNREAL_BLUEPRINT_TITLE);

    // Expandable images
    AddTitleToType(".ExpandableImage", EXPANDABLE_IMAGE);
} 

function AddTitleToType(type, title)
{
    let elements = document.querySelectorAll(type);

    for(const element of elements)
    {
        element.title = title;
    }
}