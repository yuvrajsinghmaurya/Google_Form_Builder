import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormSubmissions } from "../../api/submissionApi";
import { handleError } from "../../utils/utils";
import { ToastContainer } from "react-toastify";

// Layout Components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminSidebar from "../../components/AdminSidebar";

const ViewSubmissions = () => {
  const { id } = useParams(); 
  const token = localStorage.getItem("token");

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSubmissions = async () => {
    const res = await getFormSubmissions(id, token);

    if (!res.success) {
      handleError("Failed to load submissions");
      setLoading(false);
      return;
    }

    setSubmissions(res.submissions);
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-100 flex pt-16">
          <AdminSidebar />

          <main className="flex-1 md:ml-64 flex items-center justify-center">
            <p className="text-lg text-slate-600">Loading submissions...</p>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Layout Wrapper */}
      <div className="min-h-screen bg-slate-100 flex pt-16">

        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 md:ml-64 px-4 md:px-8 py-6">
          <div className="max-w-4xl mx-auto">

            {/* Page Title Centered */}
            <div className="w-full flex justify-center mb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                Form Submissions
              </h1>
            </div>

            {submissions.length === 0 ? (
              <p className="text-slate-600 text-center">
                No submissions found.
              </p>
            ) : (
              <div className="space-y-6">
                {submissions.map((sub, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 shadow-sm rounded-xl p-5"
                  >
                    <p className="text-sm text-slate-600 mb-2">
                      <strong>Submitted:</strong>{" "}
                      {new Date(sub.submittedAt).toLocaleString()}
                    </p>

                    <p className="text-sm text-slate-600 mb-2">
                      <strong>IP:</strong> {sub.metadata?.ip}
                    </p>

                    <p className="text-sm text-slate-600 mb-4">
                      <strong>User Agent:</strong> {sub.metadata?.userAgent}
                    </p>

                    <h3 className="font-semibold text-lg text-slate-900 mb-2">
                      Responses:
                    </h3>

                    <div className="bg-gray-50 border border-slate-200 p-4 rounded-lg space-y-2">
                      {Object.entries(sub.responses).map(([key, value]) => (
                        <div key={key}>
                          <strong className="text-slate-800">{key}:</strong>{" "}
                          <span className="text-slate-700">
                            {String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ToastContainer />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ViewSubmissions;
