import React, { useState, useEffect } from 'react';
import { Award, ChevronRight, Sparkles, Users, ArrowRight } from 'lucide-react';

const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl bg-white p-6 shadow-lg">
    <div className="mb-4 h-12 w-12 rounded-full bg-gray-200"></div>
    <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
    <div className="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
    <div className="flex items-center justify-between">
      <div className="h-4 w-1/3 rounded bg-gray-200"></div>
      <div className="h-4 w-4 rounded bg-gray-200"></div>
    </div>
  </div>
);

const SkeletonTable = () => (
  <div className="animate-pulse rounded-xl bg-white p-6 shadow-lg">
    {[1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="mb-4 flex items-center space-x-4">
        <div className="h-4 w-2/3 rounded bg-gray-200"></div>
        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        <div className="h-4 w-1/6 rounded bg-gray-200"></div>
      </div>
    ))}
  </div>
);

const SchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [featuredSchemes, setFeaturedSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('https://api.npoint.io/ccad5dfaade7154feb23');
        const data = await response.json();
        setSchemes(data);

        // Select 3 random featured schemes
        const randomSchemes = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setFeaturedSchemes(randomSchemes);

        // Simulate 5 seconds loading
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      } catch (error) {
        console.error('Error fetching schemes:', error);
        setIsLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  // Filter schemes based on the search term
  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme['Scheme Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.Beneficiary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const remainingSchemes = filteredSchemes.filter(
    (scheme) => !featuredSchemes.includes(scheme)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="mb-12">
          <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
        <div>
          <div className="mb-6 h-8 w-32 animate-pulse rounded bg-gray-200"></div>
          <SkeletonTable />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search schemes by name or beneficiary..."
          className="w-full rounded-lg border border-gray-300 p-4 text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-[rgba(67,24,255,0.85)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Featured Schemes Section */}
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-[rgba(67,24,255,0.85)]" />
          <h2 className="text-2xl font-bold text-gray-800">Featured Schemes</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredSchemes.map((scheme) => (
            <div
              key={scheme['Sl No']}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(67,24,255,0.85)] to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(67,24,255,0.1)]">
                <Award className="h-6 w-6 text-[rgba(67,24,255,0.85)]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2">
                {scheme['Scheme Name']}
              </h3>
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-600">{scheme.Beneficiary}</p>
              </div>
              <div className="flex items-center justify-between">
                <a
                  href={`https://sjd.kerala.gov.in/${scheme.Link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[rgba(67,24,255,0.85)]"
                >
                  View Details
                </a>
                <ArrowRight className="h-5 w-5 transform text-[rgba(67,24,255,0.85)] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Schemes Section */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <Users className="h-6 w-6 text-[rgba(67,24,255,0.85)]" />
          <h2 className="text-2xl font-bold text-gray-800">All Available Schemes</h2>
        </div>
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[rgba(67,24,255,0.05)]">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-[rgba(67,24,255,0.85)]">
                    Scheme Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase text-[rgba(67,24,255,0.85)]">
                    Beneficiary
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase text-[rgba(67,24,255,0.85)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {remainingSchemes.map((scheme) => (
                  <tr
                    key={scheme['Sl No']}
                    className="group transition-colors hover:bg-[rgba(67,24,255,0.02)]"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {scheme['Scheme Name']}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{scheme.Beneficiary}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`https://sjd.kerala.gov.in/${scheme.Link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[rgba(67,24,255,0.1)] px-4 py-2 text-sm font-medium text-[rgba(67,24,255,0.85)] opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemesPage;
