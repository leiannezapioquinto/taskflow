<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Task Manager</title>

      @viteReactRefresh
      @vite(['resources/js/main.jsx'])

      <script>
        if (localStorage.theme === "dark") {
          document.documentElement.classList.add("dark");
        }
      </script>
  </head>
  <body class="antialiased">
      <div id="app"></div>
  </body>
</html>
