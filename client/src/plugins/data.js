export const initialSource = `
# Live demo

Changes are automatically rendered as you type.
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

\`\`\`youtube
XGSy3_Czz8k
\`\`\`

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?

\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');
React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)

## Custom code renderer

This example shows how you can make react-markdown syntax-highlight code blocks.
By default, react-markdown will simply wrap code blocks in \\<pre>\\<code>.

\`\`\`js
const React = require('react')
const ReactDOM = require('react-dom')
const Markdown = require('react-markdown')
const CodeRenderer = require('./code-renderer')

ReactDOM.render(
  React.createElement(Markdown, {
    source: 'your markdown here',
    renderers: {
      CodeBlock: CodeRenderer
      Code: CodeRenderer
    }
  }),
  document.body
)
\`\`\`

By checking the \`inline\` property, we can reuse the same renderer for both inline and blocks of code!
For instance, we could highlight \`const React = require('react')\` inline.

See \`examples/custom-renderers\` for the code behind this.

## React router link renderer

This example renders [links](https://en.wikipedia.org/wiki/Hyperlink) without
a protocol as [react router](https://github.com/reactjs/react-router) links,
while "external" links are handled with regular links. External links also get
a nice little cloud icon thrown in to symbolize they are... well, external.
The \`target\` attribute is also set to \`_blank\` on the external ones.

In much the same way as the [syntax highlighting](/code) example,
there really is very little you can't do with this flexibility.

Hard to come up with some dummy text here, so let me just throw in another
[relative link](/image) to be handled by react-router.

In it's bare essentials, to simply render a link using React Router:

\`\`\`js
const React = require('react')
const ReactDOM = require('react-dom')
const Markdown = require('react-markdown')
const Link = require('react-router').Link

function RouterLink(props) {
  return (
    props.href.match(/^(https?:)?\\/\\//)
      ? <a href={props.href}>{props.children}</a>
      : <Link to={props.href}>{props.children}</Link>
  );
}

ReactDOM.render(
  <Markdown
    source="Some text with a [link](/path) to try out"
    renderers={{Link: RouterLink}}
  />,
  document.body
)
\`\`\`

## UML Style

\`\`\`uml
partition Conductor {
  (*) --> "Climbs on Platform"
  --> === S1 ===
  --> Bows
}

partition Audience #LightSkyBlue {
  === S1 === --> Applauds
}

partition Conductor {
  Bows --> === S2 ===
  --> WavesArmes
  Applauds --> === S2 ===
}

partition Orchestra #CCCCEE {
  WavesArmes --> Introduction
  --> "Play music"
}
\`\`\`

## Chart Style

\`\`\`chart
,category1,category2
Jan,21,23
Feb,31,17

type: column
title: Monthly Revenue
x.title: Amount
y.title: Month
y.min: 1
y.max: 40
y.suffix: $
\`\`\`

## Custom image renderer

This example uses a custom image renderer in order to lazy-load and fade in images while rendering the title as an element instead of an attribute.

* ![beer (255)](beer.jpg "Beer!")
* ![plant (453)](plant.jpg "Plant details")
* ![ego (302)](ego.jpg "Beer from Ego Brygghus")
* ![coast (252)](coast.jpg "Coast of California")
* ![sunrise (252)](sunrise.jpg "Sunrise... Somewhere")
* ![tree (459)](tree.jpg "Grown people playing")
* ![sluser (255)](sluser.jpg "Storstraumen")
* ![chania (453)](chania.jpg "Chania, Crete")
* ![legs (453)](legs.jpg "Relaxing")
* ![building (453)](building.jpg "San Francisco?")
* ![moss (453)](moss.jpg "Mossy rock")
* ![bird (255)](bird.jpg "Bird, in Egypt")
* ![alexandria (255)](alexandria.jpg "Library of Alexandria")
* ![spiral (575)](spiral.jpg "Where?")
* ![jordan (453)](jordan.jpg "Petra, Jordan")
* ![56k (276)](56k.jpg "Fastest of 56k modems")
* ![spices (309)](spices.jpg "Spices in Luxor")
* ![crete (510)](crete.jpg "Knossos, Crete")
* ![santorini (510)](santorini.jpg "Santorini")
* ![android (427)](android.jpg "Dat Android")
* ![rabbit (375)](rabbit.jpg "Lunte the Rabbit")
* ![ce (420)](ce.jpg "Codename Eagle")
* ![dragon (227)](dragon.jpg "Butterfly")
* ![parrot (574)](parrot.jpg "Parrot in Malaysia")
* ![hovlandsdal (255)](hovlandsdal.jpg "River in Hovlandsdal")
* ![tulum (453)](tulum.jpg "Tulum, Mexico")
* ![shells (422)](shells.jpg "Seashells")
* ![unicode (236)](unicode.jpg "Aqaba, Jordan")
* ![beach (546)](beach.jpg "Beach near Krabi, Thailand")
* ![meercat (637)](meercat.jpg "Meercat")
* ![towers (423)](towers.jpg "Petronas Towers")
* ![bridges (226)](bridges.jpg "Grimstad, Norway")
* ![paris (178)](paris.jpg "Paris, France")
* ![panda (441)](red-panda.jpg "Red Panda <3")
* ![sea (436)](sea.jpg "Thailand")
* ![rome (405)](rome.jpg "Rome")
* ![keg (226)](keg.jpg "Beer keg")
`;
