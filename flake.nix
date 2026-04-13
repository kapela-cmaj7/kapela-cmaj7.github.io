{
  description = "Kapela Cmaj7 website dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f {
        pkgs = nixpkgs.legacyPackages.${system};
      });
    in
    {
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            ruby_3_1
            bundler
            pkg-config
            zlib
          ];

          shellHook = ''
            export GEM_HOME="$PWD/.gems"
            export PATH="$GEM_HOME/bin:$PATH"
            export BUNDLE_PATH="$GEM_HOME"

            if [ ! -d "$GEM_HOME" ]; then
              echo "Running 'bundle install'..."
              bundle install
            fi

            echo ""
            echo "Kapela Cmaj7 dev shell ready."
            echo "  bundle exec jekyll serve    - start local server at http://localhost:4000"
            echo "  bundle exec jekyll build     - build the site to _site/"
            echo ""
          '';
        };
      });
    };
}
