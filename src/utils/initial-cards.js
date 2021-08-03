const permImage = new URL('../images/image1.jpg', import.meta.url);
const kamchatkaImage = new URL('../images/images2.jpg', import.meta.url);
const arhangelskImage = new URL('../images/image6.jpg', import.meta.url);
const crimImage = new URL('../images/image4.jpg', import.meta.url);
const zabaikalieImage = new URL('../images/image5.jpg', import.meta.url);
const kuriliImage = new URL('../images/image3.jpg', import.meta.url);

export const initialCards = [{
  name: 'Пермский край',
  link: permImage
},
{
  name: 'Камчатка',
  link: kamchatkaImage
},
{
  name: 'Архангельская область',
  link: arhangelskImage
},
{
  name: 'Крым',
  link: crimImage
},
{
  name: 'Забайкалье',
  link: zabaikalieImage
},
{
  name: 'Курильские острова',
  link: kuriliImage
}
];
