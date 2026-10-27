"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
var Hero_1 = require("@/components/sections/Hero");
var About_1 = require("@/components/sections/About");
var Projects_1 = require("@/components/sections/Projects");
var Experience_1 = require("@/components/sections/Experience");
var Certifications_1 = require("@/components/sections/Certifications");
var Skills_1 = require("@/components/sections/Skills");
var Contact_1 = require("@/components/sections/Contact");
function Page() {
    return (<main id="main-content">
      <Hero_1.default />
      <About_1.default />
      <Projects_1.default />
      <Experience_1.default />
      <Certifications_1.default />
      <Skills_1.default />
      <Contact_1.default />
    </main>);
}
