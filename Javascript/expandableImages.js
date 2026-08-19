
let imageModal;

export function BindExpandableImageModal()
{
    let closeButton = document.getElementById("ModalCloseButton");

    closeButton.addEventListener('click', OnExpandableImageClosed);
    closeButton.parentElement.children[0].addEventListener('click', OnExpandableImageClosed);

    let expandableImages = document.getElementsByClassName("ExpandableImage");

    for(const image of expandableImages)
    {
        image.addEventListener('click', ExpandImage);
    }

    imageModal = document.getElementById('ImageModal');
}

function OnExpandableImageClosed(event)
{
    imageModal.style.display = "none";
}

function ExpandImage(event)
{
    let sourceImage = event.target;
    let modalImage = document.getElementsByClassName("ModalImage")[0];

    modalImage.src = sourceImage.src;
    modalImage.alt = sourceImage.alt;

    imageModal.style.display = "block";
}
