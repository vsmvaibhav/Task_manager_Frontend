import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import "./TimetablePlanner";
const TimetablePlanner = () => {
  useEffect(() => {
    const table = document.getElementById("table");
    const rows = table.getElementsByTagName("tr");

    const hi = "#26e708";
    const no = "rgb(255, 255, 209)";
    const no_l = "rgb(238, 229, 161)";
    const LABValues_m = [];
    const LABValues_e = [];

    const THValues = [];
    const LABcellIDs_m = [];
    const LABcellIDs_e = [];

    const THcellIDs = [];
    let p = 1;
    let temp1 = 1;
    let temp2 = 31;

    for (let i = 4; i < rows.length; i += 2) {
      const cells = rows[i].getElementsByTagName("td");

      for (let j = 1; j < cells.length; j++) {
        cells[j].classList.add("t");
        cells[j].id = "t" + p++;
        THcellIDs.push(document.getElementById(cells[j].id));
        THValues.push(cells[j].innerHTML);
      }
    }

    for (let i = 5; i < rows.length; i += 2) {
      const cells = rows[i].getElementsByTagName("td");

      for (let j = 1; j < cells.length; j++) {
        cells[j].classList.add("l");

        if (j < 7) {
          cells[j].id = "l" + temp1;
          cells[j].innerHTML = "L" + temp1;
          LABcellIDs_m.push(document.getElementById(cells[j].id));
          LABValues_m.push(cells[j].innerHTML);
          temp1++;
        } else {
          cells[j].id = "l" + temp2;
          cells[j].innerHTML = "L" + temp2;
          LABcellIDs_e.push(document.getElementById(cells[j].id));
          LABValues_e.push(cells[j].innerHTML);
          temp2++;
        }
      }
    }
  }, []);

  return (
    <>
      <div id="grid_container1" width="90%" align="center">
        <table style={{ 
        margin: '50px auto', // Margin to center the table horizontally
        width: '91.5%', // Adjust width as needed
        textAlign: 'center',
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'  }}
        id="table"
        >
          <tr>
            <th rowspan="2" className="grey">
              THEORY <br />
              HOURS
            </th>
            <th className="grey">START</th>
            <th className="th">08:00</th>
            <th className="th">08:55</th>
            <th className="th">09:50</th>
            <th className="th">10:45</th>
            <th className="th">11:40</th>
            <th className="th">12:35</th>
            <th className="th">02:00</th>
            <th className="th">02:55</th>
            <th className="th">03:50</th>
            <th className="th">04:45</th>
            <th className="th">05:40</th>
            <th className="th">06:35</th>
          </tr>

          <th className="grey">END</th>
          <th className="th">08:50</th>
          <th className="th">09:45</th>
          <th className="th">10:40</th>
          <th className="th">11:35</th>
          <th className="th">12:30</th>
          <th className="th">01:25</th>
          <th className="th">02:55</th>
          <th className="th">03:45</th>
          <th className="th">04:40</th>
          <th className="th">05:35</th>
          <th className="th">06:30</th>
          <th className="th">07:25</th>
          <tr></tr>
          <tr>
            <th rowspan="2" className="grey">
              LAB <br />
              HOURS
            </th>
            <th className="grey">START</th>
            <th className="la">08:00</th>
            <th className="la">08:50</th>
            <th className="la">09:50</th>
            <th className="la">10:40</th>
            <th className="la">11:40</th>
            <th className="la">12:30</th>

            <th className="la">02:00</th>
            <th className="la">02:50</th>
            <th className="la">03:50</th>
            <th className="la">04:40</th>
            <th className="la">05:40</th>
            <th className="la">06:30</th>
          </tr>

          <tr>
            <th className="grey">END</th>
            <th className="la">08:50</th>
            <th className="la">09:40</th>
            <th className="la">10:40</th>
            <th className="la">11:30</th>
            <th className="la">12:30</th>
            <th className="la">01:20</th>

            <th className="la">02:50</th>
            <th className="la">03:40</th>
            <th className="la">04:40</th>
            <th className="la">05:30</th>
            <th className="la">06:30</th>
            <th className="la">07:20</th>
          </tr>

          <tr>
            <th rowspan="2" className="grey">
              MON
            </th>
            <td className="grey">THEORY</td>
            <td>A1</td>
            <td>F1</td>
            <td>D1</td>
            <td>TB1</td>
            <td>TG1</td>
            <td>S11</td>
            <td>A2</td>
            <td>F2</td>
            <td>D2</td>
            <td>TB2</td>
            <td>TG2</td>
            <td>S3</td>
          </tr>

          <tr>
            <td className="grey">LAB</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th rowspan="2" className="grey">
              TUE
            </th>
            <td className="grey">THEORY</td>
            <td>B1</td>
            <td>G1</td>
            <td>E1</td>
            <td>TC1</td>
            <td>TAA1</td>
            <td>-</td>
            <td>B2</td>
            <td>G2</td>
            <td>E2</td>
            <td>TC2</td>
            <td>TAA2</td>
            <td>S1</td>
          </tr>

          <tr>
            <td className="grey">LAB</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th rowspan="2" className="grey">
              WED
            </th>
            <td className="grey">THEORY</td>
            <td>C1</td>
            <td>A1</td>
            <td>F1</td>
            <td>TD1</td>
            <td>TBB1</td>
            <td>-</td>
            <td>C2</td>
            <td>A2</td>
            <td>F2</td>
            <td>TD2</td>
            <td>TBB2</td>
            <td>S4</td>
          </tr>

          <tr>
            <td className="grey">LAB</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th rowspan="2" className="grey">
              THU
            </th>
            <td className="grey">THEORY</td>
            <td>D1</td>
            <td>B1</td>
            <td>G1</td>
            <td>TE1</td>
            <td>TCC1</td>
            <td>-</td>
            <td>D2</td>
            <td>B2</td>
            <td>G2</td>
            <td>TE2</td>
            <td>TCC2</td>
            <td>S2</td>
          </tr>

          <tr>
            <td className="grey">LAB</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th rowspan="2" className="grey">
              FRI
            </th>
            <td className="grey">THEORY</td>
            <td>E1</td>
            <td>C1</td>
            <td>TA1</td>
            <td>TF1</td>
            <td>TDD1</td>
            <td>S15</td>
            <td>E2</td>
            <td>C2</td>
            <td>TA2</td>
            <td>TF2</td>
            <td>TDD2</td>
            <td>-</td>
          </tr>

          <tr>
            <td className="grey">LAB</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>

      {/* Additional elements and JavaScript code */}
      {/* Ensure to move the handleDownload function inside a React event handler if needed */}
      {/* 
        <div id="down">
          <button id="downloadBtn" onClick={handleDownload}>Download</button>
        </div>

        <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
        <script src="script.js" async defer></script> */}
      {/* </body>
    </html> */}
    </>
  );
};

export default TimetablePlanner;
