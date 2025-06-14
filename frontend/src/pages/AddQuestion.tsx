import { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

export default function AddQuestion() {
  const [question, setQuestion] = useState({
    title: "",
    difficulty: "",
    link: "",
    dateSolved: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You're not logged in!");
      return;
    }

    if (!question.title || !question.difficulty || !question.link || !question.dateSolved) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/questions", question, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("✅ Question added!");
      setQuestion({ title: "", difficulty: "", link: "", dateSolved: "" });
    } catch (err) {
      console.log(err)
      alert("❌ Failed to add question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6">
        <div className="text-2xl font-semibold flex items-center gap-2 text-green-400">
          <PlusCircle /> Add Solved Question
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={question.title}
              onChange={handleChange}
              placeholder="e.g. Two Sum"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Difficulty</label>
            <select
              name="difficulty"
              value={question.difficulty}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">LeetCode Link</label>
            <input
              type="url"
              name="link"
              value={question.link}
              onChange={handleChange}
              placeholder="https://leetcode.com/problems/two-sum"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Date Solved</label>
            <input
              type="date"
              name="dateSolved"
              value={question.dateSolved}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-500 transition py-2 rounded text-white font-semibold"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}
