import React from 'react';
import ProjectCell from './ProjectCell';


// item to html: copy paste to https://www.tinymce.com/
// html to jsx: http://magic.reactjs.net/htmltojsx.htm
export default class Resume extends React.Component {


  render() {
    // html for easy copying and pasting from html document
    var html = { __html: `
    <div class="Resume">
        <!-- header -->
        <div class="ResumeHeader">
            <p class="ResumeTitle">Gregory Vincent DiCristofaro</p>
            <p>
                <a href="http://www.gdicristofaro.com/">www.gdicristofaro.com</a> &bull;
                <a href="https://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a>
            </p>
            <p>
                <a href="mailto:gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a>
            </p>
            <p>
                <a href="tel:12155104508">(215) 510-4508</a>
            </p>
        </div>
        <div class="ResumeHorizontalDivider"></div>

        <!--Technology Experience-->
        <div class="ResumeSection">
            <h1>Technology Experience:</h1>
            <div class="ResumeSectionItem ResumeBasis">
                <div class="ResumeLeftRight">
                    <div>
                        <span class="ResumeItemHeader">Software Engineer:</span> Basis Technology, Vienna, VA
                    </div>
                    <div class="ResumeDate">February 2020 - Present</div>
                </div>
                <ul>
                    <li>Develop and maintain a java desktop application with Swing, Apache Ivy, SQLite, PostgreSQL, and Netbeans RCP</li>
                    <li>Manage automated testing using Jenkins, Bash scripting, Apache Ant, JUnit, Mockito, and snakeyaml</li>
                    <li>Use Python to update and maintain application modules, manage application localization, automate the creation of application-specific databases, and verify E2E regression tests</li>
                    <li>Manage parsing and exporting of documents using Jackson, Gson, and Apache POI</li>
                    <li>Create RESTful and Reactive web applications using Spring Boot, Jackson, Spring JDBC, Maven, React, Material UI, Typescript, Server Sent Events, Project Reactor, Styled Components, and Swagger</li>
                </ul>
            </div>
            <div class="ResumeSectionItem ResumeKbr">
                <div class="ResumeLeftRight">
                    <div>
                        <span class="ResumeItemHeader">Software Engineer:</span> KBR, Lexington Park, MD
                    </div>
                    <div class="ResumeDate">July 2017 - February 2020</div>
                </div>
                <ul>
                    <li>Develop RESTful applications utilizing .NET Web API and Json.NET</li>
                    <li>Create RESTful client applications in Java utilizing GSON and in C# utilizing Json.NET</li>
                    <li>Web-based UI development with ASP.NET Web Forms, ASP.NET MVC, Kendo UI, Bootstrap, JQuery, CSS,
                        and HTML</li>
                    <li>Data visualizations with JavaScript, TypeScript, D3.js, and SVG</li>
                    <li>Database interaction with Microsoft SQL Server, T-SQL, Entity Framework, Linq to SQL, and
                        ADO.NET</li>
                    <li>Office document exporting with EPPlus, Office Open XML, and Spire Powerpoint utilizing
                        ImageMagick/Magick.NET for image embeds</li>
                    <li>Develop web applications utilizing React, Redux, and Bootstrap frontend with ASP.NET Core backend</li>
                    <li>Modernize J2EE web applications built with JSP and JSF</li>
                </ul>
            </div>
            <div class="ResumeSectionItem ResumeBU">
                <div class="ResumeLeftRight">
                    <div>
                        <span class="ResumeItemHeader">M.S. Software Development:</span> Boston University, Boston, MA
                    </div>
                    <div class="ResumeDate">Fall 2017 - Spring 2019</div>
                </div>
                <div class="ResumeItemDescription">
                    <p>Classes in Python Development, Agile SDLC, Data Structures and Algorithms, Database Design and
                        Implementation, Server-Side Development, and Angular Development.  GPA 3.96/4.00</p>
                </div>
            </div>
            <div class="ResumeSectionItem ResumeHarvard">
                <div class="ResumeLeftRight">
                    <div>
                        <span class="ResumeItemHeader">Software Engineering Certificate:</span> Harvard University,
                        Cambridge, MA
                    </div>
                    <div class="ResumeDate">Fall 2012 - Fall 2014</div>
                </div>
                <div class="ResumeItemDescription">
                    <p>Classes included Programming Microsoft .NET, Systems Programming and Machine Organization, and
                        Software
                        Design. GPA 4.00/4.00</p>
                </div>
            </div>
        </div>

        <div class="ResumeSectionItemCanBreak ResumeNotableProgramsBuilt">
            <div>
                <span class="ResumeItemHeader">Notable Programs Built:</span>
            </div>
            <div class="ResumeItemDescription">
                <div class="NoBreak">
                    <p class="ResumeItemHeader ResumeAlgorithmic">Algorithmic:</p>
                    <ul class="ResumeAlgorithmic">
                        <li>Scala implementation of the Seam-Carving Algorithm for content-aware image resizing</li>
                        <li>Class scheduling program based on the AC-3 algorithm utilizing Apache POI API to import
                            from excel documents
                            written in Scala</li>
                        <li>Spell-checking algorithm built in C checking words against a dictionary file utilizing a 
                            self-developed hash map with buckets</li>
                        <li>Implementation of the Constant-Q transform in TypeScript and C++ for performing spectral analysis
                            on music utilizing
                            Angular development, Chart.js, Emscripten, WebAssembly, Web Audio API, and Web Workers</li>
                        <li>PostgreSQL database project for running queries to determine area covered by a
                            region as well as the overlap of regions utilizing PostGIS</li>
                    </ul>
                </div>
                <div class="NoBreak">
                    <p class="ResumeItemHeader ResumeMobile">Mobile:</p>
                    <ul class="ResumeMobile">
                        <li>Android NPuzzle game with an A* search algorithm for solving</li>
                    </ul>
                </div>
                <div class="NoBreak">
                    <p class="ResumeItemHeader ResumeWeb">Web:</p>
                    <ul class="ResumeWebPrograms">
                        <li>Map making web application developed with Node.js, TypeScript, and Angular manipulating
                            uploaded
                            images
                            using JavaScript canvas operations utilized in showing geography to young students</li>
                        <li>Calendar making application developed with Node.js, Webpack, TypeScript, React, Moment.js,
                            Material-UI,
                            and PptxGenJS that generates a PowerPoint of a calendar with calendar events for the year</li>
                        <li>Python web application for converting Photoshop files into SVG's for data visualization</li>
                    </ul>
                </div>
                <div class="NoBreak">
                    <p class="ResumeItemHeader ResumeDesktopApplications">Desktop Applications:</p>
                    <ul class="ResumeDesktopPrograms">
                        <li>Electron-based desktop application for parsing Esri shapefiles and combining them into a
                            single
                            GeoJSON file</li>
                        <li>Memory-style game built in Java AWT and Swing, which can be configured to either use images
                            or
                            text for
                            pairs used as an educational tool</li>
                        <li>Music composition software for young students built in Java utilizing the LibGDX library
                            for
                            cross-platform
                            deployment: processes PCM audio data, utilizes the JavaScript Web Audio API, visualizes
                            music
                            in
                            a sequencer, and renders standard music notation</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ResumeSectionItem ResumeLangaugesAndTechnologies">
            <div>
                <span class="ResumeItemHeader">Languages and Technologies:</span>
            </div>
            <ul>
                <li>Experienced in Java, C, C#, SQL, Python, TypeScript, Javascript, HTML, CSS, and React</li>
                <li>Working knowledge of Linux, Go, C++, Rust, PHP, Scala, and F#</li>
            </ul>
        </div>
        <!-- <div class="ResumeSectionItem ResumeMusicEdTech">
            <div>
                <span class="ResumeItemHeader">Technology Applied to Music Education:</span>
            </div>
            <ul>
                <li>Audio: GarageBand, Audacity, Noteflight, Sibelius and Finale</li>
                <li>Video: iMovie, HandBrake, VLC, FFmpeg and avconv</li>
                <li>Image: Gimp and Inkscape</li>
            </ul>
        </div> -->

        <!--Teaching Experience-->
        <div class="ResumeSection ResumeTeachingExperience">
            <h1>Teaching Experience:</h1>
            <div class="ResumeSectionItem ResumeUArts">
                <div class="ResumeLeftRight">
                    <div>
                        <span class="ResumeItemHeader">M.M. Music Education: </span> University of the Arts,
                        Philadelphia, PA
                    </div>
                    <div class="ResumeDate">Summer 2012 - Fall 2015</div>
                </div>
                <div class="ResumeItemDescription">
                    <ul>
                        <li>Thesis: Designed cross-platform music composition software to foster creativity for young
                            students
                            that processes audio, visualizes music in a sequencer and renders standard music notation</li>
                        <li>GPA 4.00/4.00</li>
                    </ul>
                </div>
            </div>

            <div class="ResumeSectionItem ResumeCertifications">
                <div><span class="ResumeItemHeader">Certifications</span></div>
                <div class="ResumeItemDescription">
                    <ul>
                        <li>
                            <div class="ResumeLeftRight">
                                <div>Orff Level II Certification</div>
                                <div class="ResumeDate">July 2012</div>
                            </div>
                        </li>
                        <li>
                            <div class="ResumeLeftRight">
                                <div>Kodaly Level I Certification</div>
                                <div class="ResumeDate">July 2010</div>
                            </div>
                        </li>
                        <li>
                            <div class="ResumeLeftRight">
                                <div>Maryland State Certification in Music (K-12)</div>
                                <div class="ResumeDate">July 2007</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="ResumeSectionItemCanBreak ResumeMusicTeacher">
                <div class="ResumeLeftRight">
                    <div>
                        <span class="ResumeItemHeader">Music Teacher: </span>
                        St. Mary's County Public Schools, Leonardtown, MD
                    </div>
                    <div class="ResumeDate">August 2006 - June 2017</div>
                </div>
                <div class="ResumeItemDescription">
                    <ul>
                        <li>
                            <span class="ResumeItemHeader ResumeInstruction NoBreak">Instruction: </span>
                            <ul>
                                <li>Taught middle school general music and band director</li>
                                <li>Taught elementary band and general music at a Title 1 and
                                    special education magnet school</li>
                            </ul>
                        </li>
                        <li>
                            <span class="ResumeItemHeader ResumeSchedulingLogistics NoBreak">Scheduling &amp; Logistics:</span>
                            <ul>
                                <li>Organized grade level and school wide events</li>
                                <li>Determined school-wide schedule to optimize instruction and transitions</li>
                            </ul>
                        </li>
                        <li>
                            <span class="ResumeItemHeader ResumeLeadership NoBreak">Leadership and Collaboration:</span>
                            <ul>
                                <li>On-site coordinator for Elementary All County Honor Band in charge of preparing
                                    public information about rehearsal locations, reserving rooms for sectional
                                    rehearsals, determining appropriate personnel for sectional rehearsals, and
                                    coordinating with director</li>
                                <li>Coordinated with teachers to determine scheduling for pull-out lessons in band to
                                    minimize impact on classroom teachers and coordinated with teachers to organize
                                    performances and events</li>
                                <li>Presenter for staff development sessions for the Fine Arts Department of St. Mary's
                                    County Public Schools</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `};

    return (
      <div>
        <h1 style={{marginBottom: '30px', textAlign: 'center'}}>Resum&eacute;</h1>
        <div dangerouslySetInnerHTML={html} />
        <div>
            <ProjectCell img="resumeThumb.png" header="PDF Version" style={{maxWidth: "350px", margin: "20px", display: "inline-block"}} description="Download the PDF version of my resume here" href="resume.pdf"/>
        </div>
      </div>
    );
  }
}
