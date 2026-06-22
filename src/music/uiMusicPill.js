import GObject from "gi://GObject";
import St from "gi://St";
import Clutter from "gi://Clutter";

export const MusicPill = GObject.registerClass(
  class MusicPill extends St.BoxLayout {
    _init(controller) {
      super._init({
        style: `
                background: rgba(40,40,40,0.9);
                padding: 8px 12px;
                border-radius: 20px;
                spacing: 10px;
            `,
        reactive: true,
      });

      this._controller = controller;

      // Title
      this._title = new St.Label({
        text: "No music",
        y_align: Clutter.ActorAlign.CENTER,
      });

      // Play/pause button
      this._button = new St.Button({
        child: new St.Icon({
          icon_name: "media-playback-start-symbolic",
          icon_size: 16,
        }),
      });

      this._button.connect("clicked", () => {
        this._controller.togglePlayback();
      });

      this.add_child(this._title);
      this.add_child(this._button);
    }

    update(title, playing) {
      this._title.set_text(title || "No music");

      let icon = this._button.get_child();
      icon.icon_name = playing
        ? "media-playback-pause-symbolic"
        : "media-playback-start-symbolic";
    }
  },
);
