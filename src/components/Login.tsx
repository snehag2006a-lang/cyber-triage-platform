type LoginProps = {
  onLogin: () => void
}

function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* ================================================= */}
        {/* BRAND */}
        {/* ================================================= */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 shadow-lg shadow-cyan-500/5">
            <span className="text-4xl">
              🛡️
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Universal Cyber
            <br />
            Intelligence Platform
          </h1>

          <p className="mt-3 text-sm text-cyan-400">
            Predict. Prevent. Detect. Simulate.
            <br />
            Respond. Investigate. Learn.
          </p>

          <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-slate-500">
            From early warning to digital evidence.
          </p>

        </div>


        {/* ================================================= */}
        {/* LOGIN CARD */}
        {/* ================================================= */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">

          {/* Header */}

          <div className="mb-7">

            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Security Center
            </p>

            <h2 className="text-2xl font-semibold">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to access your cyber intelligence workspace.
            </p>

          </div>


          {/* ================================================= */}
          {/* EMAIL */}
          {/* ================================================= */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email address
            </label>

            <input
              type="email"
              placeholder="analyst@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

          </div>


          {/* ================================================= */}
          {/* PASSWORD */}
          {/* ================================================= */}

          <div className="mb-4">

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm font-medium text-slate-300">
                Password
              </label>

              <button
                type="button"
                className="text-xs text-cyan-400 transition hover:text-cyan-300"
              >
                Forgot password?
              </button>

            </div>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

          </div>


          {/* ================================================= */}
          {/* REMEMBER ME */}
          {/* ================================================= */}

          <div className="mb-6 flex items-center gap-2">

            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-slate-700 bg-slate-950"
            />

            <label
              htmlFor="remember"
              className="text-xs text-slate-400"
            >
              Remember me
            </label>

          </div>


          {/* ================================================= */}
          {/* SIGN IN */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={onLogin}
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.99]"
          >
            Sign in
          </button>


          {/* ================================================= */}
          {/* SECURITY MESSAGE */}
          {/* ================================================= */}

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/70 p-4">

            <div className="flex gap-3">

              <span className="text-cyan-400">
                🔐
              </span>

              <div>

                <p className="text-xs font-medium text-slate-300">
                  Secure Security Workspace
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  AI-assisted cyber investigation and
                  evidence-based security decision support.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <p className="mt-6 text-center text-xs text-slate-600">
          Universal Cyber Intelligence Platform
          {' • '}
          Security Operations
        </p>

      </div>

    </div>
  )
}

export default Login