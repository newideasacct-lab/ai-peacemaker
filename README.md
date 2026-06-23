PowerShell
vercel --prod --force
(If it asks you to link to an existing project, say Yes and select ai-peacemaker).

2. Check the Build Window
When you run that command, it will print a unique tracking link in your terminal that looks like this:
Inspect: https://vercel.com/newideasacct-lab/ai-peacemaker/...

Click that link to open your browser. If it throws a red error during the Building phase, copy and paste those lines here. If it says Ready (SUCCESS) but the live URL still gives a 404, let me know—that means the build is perfect, but React Router's internal server handler isn't launching correctly on Vercel's edge network.
