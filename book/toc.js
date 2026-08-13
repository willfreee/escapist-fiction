// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">Part 1: Recognition</li><li class="chapter-item expanded "><a href="01.html"><strong aria-hidden="true">1.</strong> Chapter 1: Keep Reading (Yes, Really)</a></li><li class="chapter-item expanded "><a href="02.html"><strong aria-hidden="true">2.</strong> Chapter 2: This Isn&#39;t About Fiction</a></li><li class="chapter-item expanded "><a href="03.html"><strong aria-hidden="true">3.</strong> Chapter 3: The Two Monsters</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 2: Illusion-Dismantling</li><li class="chapter-item expanded "><a href="04.html"><strong aria-hidden="true">4.</strong> Chapter 4: The Magic Trick</a></li><li class="chapter-item expanded "><a href="05.html"><strong aria-hidden="true">5.</strong> Chapter 5: The Illusion of Relaxation</a></li><li class="chapter-item expanded "><a href="06.html"><strong aria-hidden="true">6.</strong> Chapter 6: The Illusion of Pleasure</a></li><li class="chapter-item expanded "><a href="07.html"><strong aria-hidden="true">7.</strong> Chapter 7: Real Hunger vs. Craving</a></li><li class="chapter-item expanded "><a href="08.html"><strong aria-hidden="true">8.</strong> Chapter 8: "I Deserve a Treat"</a></li><li class="chapter-item expanded "><a href="09.html"><strong aria-hidden="true">9.</strong> Chapter 9: The Illusion of Comfort</a></li><li class="chapter-item expanded "><a href="10.html"><strong aria-hidden="true">10.</strong> Chapter 10: The Parasite</a></li><li class="chapter-item expanded "><a href="11.html"><strong aria-hidden="true">11.</strong> Chapter 11: The Illusion of Loss</a></li><li class="chapter-item expanded "><a href="12.html"><strong aria-hidden="true">12.</strong> Chapter 12: The Illusion of Productivity</a></li><li class="chapter-item expanded "><a href="13.html"><strong aria-hidden="true">13.</strong> Chapter 13: The Illusion of Inspiration</a></li><li class="chapter-item expanded "><a href="14.html"><strong aria-hidden="true">14.</strong> Chapter 14: Just One More Chapter</a></li><li class="chapter-item expanded "><a href="15.html"><strong aria-hidden="true">15.</strong> Chapter 15: The Infinite Library</a></li><li class="chapter-item expanded "><a href="16.html"><strong aria-hidden="true">16.</strong> Chapter 16: Fear of Missing Stories</a></li><li class="chapter-item expanded "><a href="17.html"><strong aria-hidden="true">17.</strong> Chapter 17: Living Someone Else&#39;s Life</a></li><li class="chapter-item expanded "><a href="18.html"><strong aria-hidden="true">18.</strong> Chapter 18: "I Just Need More Willpower"</a></li><li class="chapter-item expanded "><a href="19.html"><strong aria-hidden="true">19.</strong> Chapter 19: Why Moderation Keeps the Trap Alive</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 3: Reframe</li><li class="chapter-item expanded "><a href="20.html"><strong aria-hidden="true">20.</strong> Chapter 20: What&#39;s Actually Left</a></li><li class="chapter-item expanded "><a href="21.html"><strong aria-hidden="true">21.</strong> Chapter 21: Why This Should Feel Exciting</a></li><li class="chapter-item expanded affix "><li class="part-title">Part 4: Liberation</li><li class="chapter-item expanded "><a href="22.html"><strong aria-hidden="true">22.</strong> Chapter 22: Free Choice, For the First Time</a></li><li class="chapter-item expanded "><a href="23.html"><strong aria-hidden="true">23.</strong> Chapter 23: The Last Chapter (The Closing Ritual)</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
