import React from 'react';
import ProjectCell from './ProjectCell';


// item to html: copy paste to https://www.tinymce.com/
// html to jsx: http://magic.reactjs.net/htmltojsx.htm
export default class Resume extends React.Component {


  render() {
    return (
      <div className="Resume">
        <h1 style={{marginBottom: '30px', textAlign: 'center'}}>Resum&eacute;</h1>
        <p style={{textAlign: 'center'}}><strong>Gregory Vincent DiCristofaro</strong></p>
        <p style={{textAlign: 'center'}}>23348 Esperanza Dr. • Lexington Park, MD 20653&nbsp;</p>
        <p style={{textAlign: 'center'}}><a href="http://www.gdicristofaro.com/">www.gdicristofaro.com</a> • <a href="https://www.github.com/gdicristofaro">www.github.com/gdicristofaro</a> &nbsp;&nbsp;</p>
        <p style={{textAlign: 'center'}}><a href="mailto: gregdicristofaro@gmail.com">gregdicristofaro@gmail.com</a></p>
        <p style={{textAlign: 'center'}}><a href="tel:12155104508">(215) 510-4508</a></p>
        <p><strong>EDUCATION: </strong></p>
        <p><strong>University of the Arts, </strong>Philadelphia, PA</p>
        <ul>
          <li>Masters of Music in Music Education</li>
          <li>Graduation: December 2015. GPA 4.00/4.00</li>
          <li>Thesis: Designed cross-platform music composition software to foster creativity for young students that processes audio, visualizes music in a sequencer, and renders standard music notation</li>
        </ul>
        <p><strong>Harvard University Extension School, </strong>Cambridge, MA</p>
        <ul>
          <li>Software Engineering Certificate</li>
          <li>Completion: December 2014. GPA 4.00/4.00</li>
        </ul>
        <p><strong>Certifications</strong></p>
        <ul>
          <li>Orff Level II Certification: July 2012</li>
          <li>Kodaly Level I Certification: July 2010</li>
          <li>Maryland State Certification in Music (K-12): July 2007</li>
        </ul>
        <p><strong>The Pennsylvania State University</strong>, University Park, PA</p>
        <ul>
          <li>Bachelor of Science in Music Education</li>
          <li>Graduation: May 2006. GPA 3.71/4.00</li>
          <li>Academic Honors: Dean’s List for seven semesters, Graduated with distinction</li>
        </ul>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p><strong>TECHNOLOGY EXPERIENCE: </strong></p>
        <p><strong>Notable Programs Built:</strong></p>
        <p><strong>Algorithmic:</strong></p>
        <ul>
          <li>Scala implementation of the Seam-Carving Algorithm</li>
          <li>Scheduling program based on the AC-3 algorithm utilizing Apache POI API to import from excel documents written in Scala</li>
          <li>Spell-checking algorithm built in C, which loads and unloads a dictionary file and checks words in a dictionary utilizing a self-developed hash map with buckets</li>
        </ul>
        <p><strong>Mobile:</strong></p>
        <ul>
          <li>jQuery-based mobile application for determining local weather and news using Yahoo and Google API’s</li>
          <li>Android NPuzzle game with an A* search algorithm for solving</li>
        </ul>
        <p><strong>Desktop Applications:</strong></p>
        <ul>
          <li>Memory-style game built in Java AWT and Swing, which can be configured to either use images or text for pairs</li>
          <li>Police scanner UI utilizing bing maps API, WPF, WCF, and the prism framework built in C#</li>
          <li>Music composition software for young students built in java utilizing the libgdx library for cross-platform deployment: processes PCM audio data, utilizes the web audio javascript API, visualizes music in a sequencer, and renders standard music notation</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>Languages and Technologies:</strong></p>
        <ul>
          <li>Experienced in Java, Scala, C, C#, F#, Javascript/HTML/CSS</li>
          <li>Working knowledge of Amazon AWS, Google App Engine, shell scripting, PHP, Dart, Rust, OCaml</li>
          <li>Familiar with Linux distributions: Busybox, Ubuntu, Fedora</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>Technology Applied to Music Education:</strong></p>
        <ul>
          <li>Audio: GarageBand, Audacity, Sibelius</li>
          <li>Video: iMovie, HandBrake, VLC, FFmpeg, avconv</li>
          <li>Image: Gimp, Inkscape</li>
          <li>Presentation: Apple Keynote, PowerPoint, Google Slides, Smart Notebook</li>
        </ul>
        <p>&nbsp;</p>
        <p><strong>TEACHING EXPERIENCE: </strong></p>
        <p><strong>St. Mary’s County Public Schools, </strong>Lexington Park, MD</p>
        <table style={{width: '100%'}}>
        <tbody>
          <tr>
            <td style={{width: '70.5722%'}}><em>Music Teacher at Green Holly Elementary</em></td>
            <td style={{width: '27.5204%', textAlign: 'left'}}><em>August 2009 – present</em></td>
          </tr>
          <tr>
            <td style={{width: '70.5722%'}}><em>Music Teacher at Spring Ridge Middle School</em></td>
            <td style={{width: '27.5204%', textAlign: 'left'}}><em>August 2008 – June 2009</em></td>
          </tr>
        </tbody>
      </table>
        <ul>
          <li><strong>Instruction: </strong>
            <ul>
              <li>Taught middle school general music and band director</li>
              <li>Teach elementary band and general music at a Title 1, Special Education magnet school</li>
              <li>Teach after school guitar club and after school percussion ensemble</li>
              <li>Teach private lessons on brass and woodwind instruments as well as giving lessons on music history and music theory</li>
            </ul>
          </li>
          <li><strong>Scheduling &amp; Logistics: </strong>
            <ul>
              <li>Organize grade level and school wide events including sing-alongs, dances, and multicultural educational events.</li>
              <li>Determine school schedule for the areas of music, physical education, art, and media. Scheduling requirements include optimization of instruction by allowing for band, strings, and chorus pullout lessons to not interfere with certain periods of instruction, schedule classes to allow for easy transitions from class to class, and allow for similar schedules from week to week when possible.</li>
            </ul>
          </li>
          <li><strong>Special Needs: </strong>Teach general music to community-based special education classes.</li>
          <li><strong>Collegial Collaboration:</strong> Coordinated with teachers to determine scheduling for pull-out lessons in band to minimize impact on classroom teachers and coordinated with teachers to organize performances and events.</li>
          <li><strong>Presenter:</strong> Presenter for staff development sessions for the Fine Arts Department of St. Mary’s County Public Schools. Presented on use of technology for administrative tasks, Japanese music and activities, and a comparison of band method books.</li>
          <li><strong>Leadership:</strong> On-site coordinator for Elementary All County Honor Band. In charge of preparing public information about rehearsal locations, reserving rooms for sectional rehearsals, determining appropriate personnel for sectional rehearsals, and coordinating with director.</li>
        </ul>
        <div>
          <ProjectCell img="resumeThumb.png" header="PDF Version" style={{maxWidth: "300px", margin: "20px", display: "inline-block"}} description="Download the PDF version of my resume here" href="resume.pdf"/>
        </div>
      </div>
    );
  }
}
