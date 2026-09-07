#!/bin/sh
set -e

# ── Colors ────────────────────────────────────────────────
if [ -t 1 ]; then
  PURPLE='\033[38;5;141m'
  GREEN='\033[38;5;114m'
  BLUE='\033[38;5;110m'
  RED='\033[38;5;203m'
  DIM='\033[2m'
  BOLD='\033[1m'
  RESET='\033[0m'
else
  PURPLE=''; GREEN=''; BLUE=''; RED=''; DIM=''; BOLD=''; RESET=''
fi

ok()   { printf "${GREEN}✓${RESET} %s\n" "$1"; }
step() { printf "${BLUE}→${RESET} %s\n" "$1"; }
err()  { printf "${RED}✗${RESET} %s\n" "$1"; }
warn(){ printf "${RED}${BOLD}!${RESET} %s\n" "$1"; }

# ── Ask helper (reads from /dev/tty) ─────────────────────
ask() {
  prompt="$1"
  printf "%s " "$prompt" > /dev/tty
  read -r ans < /dev/tty
  printf '%s' "$ans"
}

# ── Layout helpers ───────────────────────────────────────
WIDTH=58

hr() {
  printf "${PURPLE}%s${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
}

center() {
  text="$1"
  pad=$(( (WIDTH - ${#text}) / 2 ))
  printf "${PURPLE}│${RESET}%*s${BOLD}${PURPLE}%s${RESET}%*s${PURPLE}│${RESET}\n" "$pad" "" "$text" $((WIDTH - pad - ${#text})) ""
}

left() {
  text="$1"
  printf "${PURPLE}│${RESET} %s%-*s${PURPLE}│${RESET}\n" "$text" $((WIDTH - ${#text} - 1)) ""
}

# ── Paths ────────────────────────────────────────────────
REPO="https://github.com/Shishir-Kc/A.R.I.A"
INSTALL_DIR="$HOME/.A.R.I.A"
CONFIG_DIR="$HOME/.config/A.R.I.A"
LOGS_DIR="$CONFIG_DIR/Logs"
MEMORY_DIR="$CONFIG_DIR/Memory"
SKILLS="$CONFIG_DIR/Skills"
ARIA_CONFIG="$CONFIG_DIR/Config"
LAUNCHER="$HOME/.local/bin/aria"
BASHRC="$HOME/.bashrc"

remove_launcher() {
  if [ -f "$LAUNCHER" ]; then
    rm -f "$LAUNCHER"
    ok "Removed launcher: $LAUNCHER"
  fi
  if [ -w "$BASHRC" ]; then
    tmp="$(mktemp)"
    grep -Fvx 'export PATH="$HOME/.local/bin:$PATH"' "$BASHRC" > "$tmp" 2>/dev/null || true
    if [ -s "$tmp" ] || [ ! -s "$BASHRC" ]; then
      mv "$tmp" "$BASHRC"
    else
      rm -f "$tmp"
    fi
    ok "Removed PATH entry from $BASHRC"
  fi
}

remove_code() {
  if [ -d "$INSTALL_DIR" ]; then
    rm -rf "$INSTALL_DIR"
    ok "Removed A.R.I.A code install: $INSTALL_DIR"
  else
    step "No code install found at $INSTALL_DIR"
  fi
  remove_launcher
}

# ── Two-step config removal ──────────────────────────────
remove_config() {
  if [ ! -d "$CONFIG_DIR" ]; then
    step "No config found at $CONFIG_DIR"
    return 0
  fi
  echo ""
  warn "This will DELETE your A.R.I.A configuration directory:"
  printf "    ${RED}%s${RESET}\n" "$CONFIG_DIR"
  echo ""
  first="$(ask "Continue and review the warning? [y/N]:")"
  case "$first" in
    [Yy])
      ;;
    *)
      echo "Aborted. Config was NOT removed."
      return 1
      ;;
  esac

  echo ""
  printf "${RED}${BOLD}╭──────────────────────────────────────────────────────────╮${RESET}\n"
  printf "${RED}${BOLD}│  ⚠  FINAL WARNING                                           │${RESET}\n"
  printf "${RED}${BOLD}│  This will delete EVERY memory and config you have created. │${RESET}\n"
  printf "${RED}${BOLD}│  This action CANNOT be undone.                             │${RESET}\n"
  printf "${RED}${BOLD}╰──────────────────────────────────────────────────────────╯${RESET}\n"
  echo ""
  second="$(ask "Type DELETE to confirm removal:")"
  if [ "$second" != "DELETE" ]; then
    echo "Confirmation did not match 'DELETE'. Config was NOT removed."
    return 1
  fi

  rm -rf "$CONFIG_DIR"
  ok "Removed A.R.I.A config: $CONFIG_DIR"
}

# ── Uninstall menu ───────────────────────────────────────
uninstall() {
  echo ""
  printf "${PURPLE}╭%s╮${RESET}\n" "$(printf '─%.0s' $(seq 1 58))"
  center "ARIA Uninstaller"
  printf "${PURPLE}╰%s╯${RESET}\n" "$(printf '─%.0s' $(seq 1 58))"
  echo ""

  if [ ! -d "$INSTALL_DIR" ] && [ ! -d "$CONFIG_DIR" ] && [ ! -f "$LAUNCHER" ]; then
    err "Nothing to uninstall — A.R.I.A is not present."
    exit 0
  fi

  printf "What would you like to remove?\n"
  printf "  [R]emove code   \xE2\x80\x94 remove the A.R.I.A install + aria launcher\n"
  printf "  [C]onfig        \xE2\x80\x94 remove your A.R.I.A config (2-step confirm)\n"
  printf "  [A]ll           \xE2\x80\x94 remove code AND config (config needs 2-step confirm)\n"
  printf "  [Q]uit          \xE2\x80\x94 do nothing\n"
  printf "Choice [r/R/c/C/a/A/q/Q]: "
  read -r choice < /dev/tty

  case "$choice" in
    [Rr])
      remove_code
      ;;
    [Cc])
      remove_config
      ;;
    [Aa])
      remove_code
      remove_config
      ;;
    [Qq])
      echo "Aborted."
      exit 0
      ;;
    *)
      err "Invalid choice. Aborted."
      exit 1
      ;;
  esac
  echo ""
  ok "Uninstall complete."
  exit 0
}

# ── Route: uninstall mode (after helpers are defined) ────
case "${1:-}" in
  -u|--uninstall)
    uninstall
    ;;
esac


# ── Title box ─────────────────────────────────────────────
TITLE="\$ ARIA Agent Installer"
TAGLINE="A self hosted Life Agent Harness for personal Use"

echo ""
printf "${PURPLE}╭%s╮${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
center "$TITLE"
printf "${PURPLE}├%s┤${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
left "  $TAGLINE"
printf "${PURPLE}╰%s╯${RESET}\n" "$(printf '─%.0s' $(seq 1 "$WIDTH"))"
echo ""

# ── Spinner ───────────────────────────────────────────────
spinner() {
  pid=$1
  msg=$2
  spin="⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷"
  set -- $spin
  i=1
  n=$#
  while kill -0 "$pid" 2>/dev/null; do
    eval "c=\${$i}"
    printf "\r${BLUE}%s${RESET} %s" "$c" "$msg"
    i=$((i % n + 1))
    sleep 0.1
  done
  wait "$pid"
  ret=$?
  if [ "$ret" -eq 0 ]; then
    printf "\r${GREEN}✓${RESET} %s\n" "$msg"
  else
    printf "\r${RED}✗${RESET} %s\n" "$msg"
  fi
  return $ret
}

# ── Detect OS ─────────────────────────────────────────────
OS_NAME="unknown"
OS_VERSION=""
KERNEL="$(uname -s)"
ARCH="$(uname -m)"

case "$KERNEL" in
  Linux)
    if [ -r /etc/os-release ]; then
      . /etc/os-release
      OS_NAME="${ID:-linux}"
      OS_VERSION="${VERSION_ID:-${BUILD_ID:-rolling}}"
    else
      OS_NAME="linux"
      OS_VERSION="unknown"
    fi
    ok "Detected: linux ($OS_NAME${OS_VERSION:+ $OS_VERSION}) [$ARCH]"
    ;;
  *)
    err "Unsupported OS: $KERNEL"
    exit 1
    ;;
esac
echo ""

# ── System requirements ──────────────────────────────
step "Checking RAM"
total_ram_kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
total_ram_gb=$((total_ram_kb / 1024 / 1024))
if [ "$total_ram_gb" -le 4 ]; then
    err "At least 4 GB of RAM required. Detected: ${total_ram_gb} GB"
    exit 1
fi
ok "${total_ram_gb} GB RAM detected"
echo ""

# ── Detect / install uv ──────────────────────────────────
if command -v uv >/dev/null 2>&1; then
  UV_VER="$(uv --version 2>/dev/null | awk '{print $2}')"
  ok "uv already installed (v${UV_VER:-unknown})"
else
  (curl -LsSf https://astral.sh/uv/install.sh | sh > /dev/null 2>&1) &
  spinner $! "Installing managed uv into \$HOME/.local/bin ..." || {
    err "Failed to install uv. Install it manually: https://docs.astral.sh/uv/"
    exit 1
  }
  export PATH="$HOME/.local/bin:$PATH"
  if command -v uv >/dev/null 2>&1; then
    UV_VER="$(uv --version 2>/dev/null | awk '{print $2}')"
    ok "uv installed (v${UV_VER:-unknown})"
  else
    err "uv installed but not found on PATH. Restart your shell and re-run this script."
    exit 1
  fi
fi
echo ""

# ── ARIA ASCII banner ────────────────────────────────────
cat << "EOF"
        █████╗  ██████╗  ██╗ █████╗
       ██╔══██╗ ██╔══██╗ ██║██╔══██╗
       ███████║ ██████╔╝ ██║███████║
       ██╔══██║ ██╔══██╗ ██║██╔══██║
       ██║  ██║ ██║  ██║ ██║██║  ██║
       ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝╚═╝  ╚═╝
EOF
echo ""

# ── Handle existing install ──────────────────────────────
if [ -d "$INSTALL_DIR" ]; then
    echo "ARIA is already installed at $INSTALL_DIR"
    printf "What would you like to do?\n"
    printf "  [R]einstall  \xE2\x80\x94 remove existing install and clone fresh\n"
    printf "  [U]pgrade    \xE2\x80\x94 pull latest changes and sync deps\n"
    printf "  [Q]uit       \xE2\x80\x94 do nothing\n"
    printf "Choice [r/R/u/U/q/Q]: "
    read -r choice < /dev/tty
    case "$choice" in
        [Rr])
            rm -rf "$INSTALL_DIR"
            (git clone "$REPO" "$INSTALL_DIR" > /dev/null 2>&1) &
            spinner $! "Reinstalling ARIA" || exit 1
            ;;
        [Uu])
            (cd "$INSTALL_DIR" && git pull > /dev/null 2>&1) &
            spinner $! "Upgrading ARIA" || exit 1
            ;;
        [Qq])
            echo "Aborted."
            exit 0
            ;;
        *)
            echo "Invalid choice. Aborted."
            exit 1
            ;;
    esac
else
    (git clone "$REPO" "$INSTALL_DIR" > /dev/null 2>&1) &
    spinner $! "Cloning ARIA" || exit 1
fi
echo ""
(cd "$INSTALL_DIR" && uv sync > /dev/null 2>&1) &
spinner $! "Syncing dependencies" || exit 1
echo ""

step "Creating configs"
mkdir -p "$CONFIG_DIR" "$LOGS_DIR" "$MEMORY_DIR" "$SKILLS" "$ARIA_CONFIG"

step "Plugging in aria"
mkdir -p ~/.local/bin
cat > ~/.local/bin/aria << 'ARIA_EOF'
#!/bin/sh
cd "$HOME/.A.R.I.A" && exec uv run python3 -m AriaCli.main "$@"
ARIA_EOF
chmod +x ~/.local/bin/aria
if ! grep -q '.local/bin' ~/.bashrc 2>/dev/null; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
fi

echo ""
ok "Done. Run 'source ~/.bashrc' or open a new terminal, then 'aria' will be available."
