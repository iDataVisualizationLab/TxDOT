// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let splashscreen_window = app.get_webview_window("splashscreen").unwrap();
      let main_window = app.get_webview_window("main").unwrap();
      main_window.set_title("title").unwrap();    
      main_window.center().unwrap();
      
      // Simulate some initialization work
      std::thread::spawn(move || {
        std::thread::sleep(std::time::Duration::from_secs(3)); 
        splashscreen_window.show().unwrap();
        std::thread::sleep(std::time::Duration::from_secs(2)); 
        splashscreen_window.close().unwrap();
        main_window.show().unwrap();
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
