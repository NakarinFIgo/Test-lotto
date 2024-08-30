import React, { useState } from "react";

const LotteryPage = () => {
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem("lotteryResults");
    return savedResults ? JSON.parse(savedResults) : null;
  });
  const [lotteryNumber, setLotteryNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleDraw = () => {
    const randomNumber = () =>
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    const firstPrize = randomNumber();
    const secondPrizes = Array.from({ length: 3 }, randomNumber);
    const nearbyPrizes = [
      (parseInt(firstPrize) - 1).toString().padStart(3, "0"),
      (parseInt(firstPrize) + 1).toString().padStart(3, "0"),
    ];
    const lastTwoDigitsPrize = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    const newResults = {
      firstPrize,
      secondPrizes,
      nearbyPrizes,
      lastTwoDigitsPrize,
    };

    setResults(newResults);
    localStorage.setItem("lotteryResults", JSON.stringify(newResults));
  };

  const handleCheck = () => {
    if (!results) return;
    const { firstPrize, secondPrizes, nearbyPrizes, lastTwoDigitsPrize } =
      results;
    let prizeMessage = "ไม่ถูกรางวัล";
    let win = false;

    if (lotteryNumber == firstPrize) {
      if (win) prizeMessage += "และ";
      prizeMessage += "รางวัลที่ 1 ";
      win = true;
    }
    if (lotteryNumber.slice(-2) == lastTwoDigitsPrize) {
      if (win) prizeMessage += "และ";
      prizeMessage += "รางวัลเลขท้าย 2 ตัว";
      win = true;
    }
    if (nearbyPrizes.includes(lotteryNumber)) {
      if (win) prizeMessage += "และ";
      prizeMessage += "รางวัลเลขข้างเคียง ";
      win = true;
    }
    if (secondPrizes.includes(lotteryNumber)) {
      if (win) prizeMessage += "และ";
      prizeMessage += "รางวัลที่ 2 ";
      win = true;
    }
    if (win) {
      prizeMessage = prizeMessage.replace("ไม่ถูกรางวัล", "ถูก");
    }

    setMessage(prizeMessage);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded shadow-lg max-w-xl">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
        รางวัลลอตเตอรี่ Diversition
      </h1>

      <button
        className="w-full bg-blue-500 text-white font-semibold py-2 mb-5 rounded hover:bg-blue-600"
        onClick={handleDraw}
      >
        ดำเนินการสุ่มรางวัล
      </button>

      <table className="table-auto w-full mb-5 text-center border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border py-2">รางวัลที่</th>
            <th className="border py-2">หมายเลขรางวัล</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border py-2 font-semibold">รางวัลที่ 1</td>
            <td className="border py-2">{results?.firstPrize || "-"}</td>
          </tr>
          <tr>
            <td className="border py-2 font-semibold">
              รางวัลเลขข้างเคียงรางวัลที่ 1
            </td>
            <td className="border py-2">
              {results?.nearbyPrizes.join(", ") || "-"}
            </td>
          </tr>
          <tr>
            <td className="border py-2 font-semibold">รางวัลที่ 2</td>
            <td className="border py-2">
              {results?.secondPrizes.join(", ") || "-"}
            </td>
          </tr>
          <tr>
            <td className="border py-2 font-semibold">รางวัลเลขท้าย 2 ตัว</td>
            <td className="border py-2">
              {results?.lastTwoDigitsPrize || "-"}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-blue-50 p-4 rounded mb-5">
        <h2 className="text-lg font-bold mb-2">
          ตรวจรางวัลลอตเตอรี่ Diversition
        </h2>
        <input
          type="text"
          className="w-full p-2 border border-blue-300 rounded mb-3"
          placeholder="กรอกหมายเลขล็อตเตอรี่"
          value={lotteryNumber}
          onChange={(e) => setLotteryNumber(e.target.value)}
        />
        <button
          className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
          onClick={handleCheck}
        >
          ตรวจรางวัล
        </button>
      </div>

      {message && (
        <div className="mt-4 p-3 bg-yellow-200 text-yellow-800 font-semibold text-center rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default LotteryPage;
