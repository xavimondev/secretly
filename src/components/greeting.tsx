import { motion } from "framer-motion";

export function Greeting() {
  return (
    <div
      key="overview"
      className="max-w-3xl mx-auto md:mt-4 px-8 size-full flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold"
      >
        Hello there!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="text-zinc-500"
      >
        <div className="rounded-lg text-white border border-purple-400/50 bg-purple-400/5 p-4 mt-4">
          <p className="text-sm mb-2">I can help you with:</p>
          <ul className="text-sm space-y-1 list-disc pl-5">
            <li>Creating new organizations</li>
            <li>Viewing your profile information</li>
            <li>Showing your organizations</li>
            <li>Managing members and roles</li>
            <li>Sending and managing invitations</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
