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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="01.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="02.html"><strong aria-hidden="true">2.</strong> The Easy Way</a></li><li class="chapter-item expanded "><a href="03.html"><strong aria-hidden="true">3.</strong> Why Is It So Hard to Stop?</a></li><li class="chapter-item expanded affix "><li class="part-title">Part II — Understanding the Addiction</li><li class="chapter-item expanded "><a href="04.html"><strong aria-hidden="true">4.</strong> The Nature of Escapist Fiction</a></li><li class="chapter-item expanded "><a href="05.html"><strong aria-hidden="true">5.</strong> Brainwashing</a></li><li class="chapter-item expanded "><a href="06.html"><strong aria-hidden="true">6.</strong> Common Illusions</a></li><li class="chapter-item expanded affix "><li class="part-title">Part III — Destroying the Illusions</li><li class="chapter-item expanded "><a href="07.html"><strong aria-hidden="true">7.</strong> What Am I Giving Up?</a></li><li class="chapter-item expanded "><a href="08.html"><strong aria-hidden="true">8.</strong> The Theft of Time</a></li><li class="chapter-item expanded "><a href="09.html"><strong aria-hidden="true">9.</strong> The Cost of Living Through Fiction</a></li><li class="chapter-item expanded "><a href="10.html"><strong aria-hidden="true">10.</strong> The Advantages of Escapist Fiction</a></li><li class="chapter-item expanded "><a href="11.html"><strong aria-hidden="true">11.</strong> The "Willpower Method"</a></li><li class="chapter-item expanded "><a href="12.html"><strong aria-hidden="true">12.</strong> The Trap of Cutting Down</a></li><li class="chapter-item expanded "><a href="13.html"><strong aria-hidden="true">13.</strong> "Just One More Chapter" (or Episode)</a></li><li class="chapter-item expanded "><a href="14.html"><strong aria-hidden="true">14.</strong> "I&#39;m Just a Casual Reader"</a></li><li class="chapter-item expanded "><a href="15.html"><strong aria-hidden="true">15.</strong> The Infinite Content Machine</a></li><li class="chapter-item expanded "><a href="16.html"><strong aria-hidden="true">16.</strong> Is It Really a Social Habit?</a></li><li class="chapter-item expanded "><a href="17.html"><strong aria-hidden="true">17.</strong> When Should I Quit?</a></li><li class="chapter-item expanded "><a href="18.html"><strong aria-hidden="true">18.</strong> Will I Miss the Stories?</a></li><li class="chapter-item expanded "><a href="19.html"><strong aria-hidden="true">19.</strong> Can I Separate Entertainment from Escapism Right Now?</a></li><li class="chapter-item expanded "><a href="20.html"><strong aria-hidden="true">20.</strong> Avoid False Reasons to Quit</a></li><li class="chapter-item expanded affix "><li class="part-title">Part IV — Escaping the Trap</li><li class="chapter-item expanded "><a href="21.html"><strong aria-hidden="true">21.</strong> The Easy Way to Stop</a></li><li class="chapter-item expanded "><a href="22.html"><strong aria-hidden="true">22.</strong> Understanding Withdrawal</a></li><li class="chapter-item expanded "><a href="23.html"><strong aria-hidden="true">23.</strong> "Just One Peek at the New Update"</a></li><li class="chapter-item expanded "><a href="24.html"><strong aria-hidden="true">24.</strong> Will It Be Harder for Me?</a></li><li class="chapter-item expanded "><a href="25.html"><strong aria-hidden="true">25.</strong> Replacement Addictions</a></li><li class="chapter-item expanded "><a href="26.html"><strong aria-hidden="true">26.</strong> Should I Avoid Fandoms &amp; Story Platforms?</a></li><li class="chapter-item expanded affix "><li class="part-title">Part V — Freedom</li><li class="chapter-item expanded "><a href="27.html"><strong aria-hidden="true">27.</strong> The Moment Everything Changes</a></li><li class="chapter-item expanded "><a href="28.html"><strong aria-hidden="true">28.</strong> The Final Chapter (The Last Session)</a></li><li class="chapter-item expanded "><a href="29.html"><strong aria-hidden="true">29.</strong> Frequently Asked Questions</a></li><li class="chapter-item expanded "><a href="30.html"><strong aria-hidden="true">30.</strong> Help Someone Else Escape</a></li><li class="chapter-item expanded "><a href="31.html"><strong aria-hidden="true">31.</strong> Advice for Non-Users &amp; Loved Ones</a></li><li class="chapter-item expanded "><a href="32.html"><strong aria-hidden="true">32.</strong> The Instructions</a></li><li class="chapter-item expanded "><a href="33.html"><strong aria-hidden="true">33.</strong> Now</a></li></ol>';
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
