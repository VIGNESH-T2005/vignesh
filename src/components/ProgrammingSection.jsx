"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import StatCard from "./StatCard";
import StatCard2 from "./StatCard2";

const ProgrammingSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/leetcode");
        const data = await res.json();

        setStats(data);
      } catch (error) {
        console.log("Failed to fetch leetcode stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-screen text-white flex items-center justify-center px-4"
    >
      <motion.div
        className="w-full max-w-4xl text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.6 }}
      >

        {/* Heading */}
        <h2 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Problem Solving
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg max-w-3xl text-center text-[#ADB7BE]">
          I actively practice competitive programming on LeetCode with a strong
          focus on data structures, algorithms, and problem-solving consistency.
          Through disciplined practice and continuous learning.
        </p>

        {/* Leetcode Heading */}
        <div className="mt-6 flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-500">
            Problem Stats From LeetCode
          </h2>

          <Link
            href="https://leetcode.com/u/vignesh_webdev/"
            target="_blank"
          >
            <div className="bg-white rounded-sm p-1 ml-3">
              <Image
                src="/leetcode-icon.png"
                width={24}
                height={24}
                alt="Leetcode Icon"
              />
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <section className="mt-8 w-full">

          {loading ? (
            <p className="text-xl font-bold text-green-700 text-center">
              Loading the stats from LeetCode.....
            </p>
          ) : (
            <div className="space-y-5">

              {/* Total Solved */}
              <StatCard2
                title={
                  <>
                    <span className="hidden sm:inline">
                      Total Problems Solved till now
                    </span>

                    <span className="sm:hidden">
                      Total Solved
                    </span>
                  </>
                }
                value={stats.totalSolved}
              />

              {/* Easy Medium Hard */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <StatCard
                  title="Easy"
                  value={stats.easySolved}
                  className="text-blue-500"
                />

                <StatCard
                  title="Medium"
                  value={stats.mediumSolved}
                  className="text-yellow-400"
                />

                <StatCard
                  title="Hard"
                  value={stats.hardSolved}
                  className="text-red-600"
                />

              </div>

              {/* Ranking */}
              <StatCard2
                title="Global Ranking"
                value={stats.ranking}
              />

            </div>
          )}

        </section>

      </motion.div>
    </div>
  );
};

export default ProgrammingSection;