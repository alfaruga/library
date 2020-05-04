<h1>An interactive library</h1>
<p style='text-align: justify'>A registry of some books i've read. Made used vanilla JS, HTML5 and stylished with bootstrap.</p>

<p>This project used JS objects. The 'book shelf' is an array of objects. The objects are made using a Books class that gives that has
an author, title, pages, year, and read status.</p>

Some details about this project:
<ul>
<li>It has an add book button that show a form to create a new entry; it <strong>must have a title</strong>
, the other arguments are optional and the read status is <em>false</em> by default</li>
<li>Every book has a read status that can be toggled and a delete button</li>
<li>The delete button prompts a mesagge to confirm the elimination of that entry, also it double checks by asking for the
<strong>exact name</strong> of the book to delete.</li>
<li>It saves the books array using the 'localStorage' property. The books are saveed in the Sotrage object.</li>
<li>The data is shown as a responsive table</li>
</ul>
