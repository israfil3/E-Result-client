import { useParams } from "react-router";
import DataFetch from "../../components/DataFetch/DataFetch";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const ResultPage = () => {
  const allData = DataFetch(); //from DataFetch.js in DataFetch files
  console.log(allData);
  const { idNumber } = useParams();
  console.log(idNumber);
  const studentInformation = allData[0].find(
    (user) => user.classId == idNumber
  );
  console.log(studentInformation);
  console.log(studentInformation?.result[0].midTerm);
  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 0.95);
      const pdf = new jsPDF("in", "mm", "A0", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("result.pdf");
    });
  };
  return (
    <>
      <div className="lg:px-[250px] px-[35px]" ref={pdfRef}>
        <div className="container bg-[#E4E4E4] mx-auto  rounded-xl pb-4 ">
          <div className="text-center mb-8 rounded-t-xl bg-[#ACE9D7] ">
            <h1 className="text-md font-medium py-4">Result Table</h1>
          </div>
          <div className="lg:px-[45px] px-[25px] flex md:flex-row flex-col gap-2 justify-center text-white">
            <h1 className="p-3 rounded-md bg-indigo-600 shadow-md shadow-indigo-500">
              Name: {studentInformation?.Name}
            </h1>
            <p className="p-3 rounded-md bg-indigo-600 shadow-md shadow-indigo-500">
              Roll: {studentInformation?.classId}
            </p>
            <p className="p-3 rounded-md bg-indigo-600 shadow-md shadow-indigo-500">
              Section: {studentInformation?.section}
            </p>
          </div>
          <div className=" mx-auto px-4 ">
            <table className="table font mx-auto table-compact  w-full m-8 text-center">
              <thead className="">
                <tr className="bg-[#ACE9D7]">
                  <th className="font-medium py-1">Subject</th>
                  <th className="font-medium">Mark</th>
                  <th className="font-medium">Grade</th>
                </tr>
              </thead>
              <tbody className=" [&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-[#ACE9D7]">
                {studentInformation?.result[0].midTerm.map((res, i) => (
                  <tr key={i}>
                    <td className="py-1">{res?.subjectName}</td>
                    <td>{res?.number}</td>
                    {res?.number >= 80 ? (
                      <td>A+</td>
                    ) : res?.number >= 70 ? (
                      <td>A</td>
                    ) : res?.number >= 60 ? (
                      <td>A</td>
                    ) : res?.number >= 50 ? (
                      <td>B</td>
                    ) : res?.number >= 40 ? (
                      <td>C</td>
                    ) : res?.number >= 33 ? (
                      <td>D</td>
                    ) : (
                      "F"
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center lg:px-[250px] md:px-[150px] mt-4">
        <div className="flex md:flex-row items-center justify-center flex-col md:w-3/4  gap-4">
          <button
            onClick={downloadPdf}
            type="submit"
            className=" bg-[#ACE9D7] text-black hover:bg-[#03A373]  md:w-1/3 btn btn-primary py- rounded-xl "
          >
            Download Result
          </button>
          <button
            type="submit"
            className=" bg-[#E9ACAC] text-black hover:bg-[#a11313]  md:w-1/3 btn btn-primary rounded-xl h-[35px]"
          >
            Apply For Recheck
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
